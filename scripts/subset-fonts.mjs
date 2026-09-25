/**
 * IBM Plex Sans JP を「このサイトで実際に使う文字だけ」にサブセット化する。
 *
 *   npm run fonts:subset
 *
 * 入力: app/ components/ data/ のソースに現れる文字 + 基本文字（ASCII・かな・約物）
 * 出力: public/fonts/plex-sans-jp-{weight}-{hash}.woff2 と app/font-subset.css（unicode-range 付き）
 *
 * 本文を書き換えたらこのスクリプトを実行し、生成物ごとコミットする。
 * 実行し忘れても、足りない文字は @fontsource/ibm-plex-sans-jp（unicode-range 分割版）が
 * 自動で補うので表示は崩れない（その文字の分だけ追加のフォント取得が発生するだけ）。
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fontverter from "fontverter";
import { Blob, Face } from "harfbuzzjs";
import subsetFont from "subset-font";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIRS = ["app", "components", "data"];
const SOURCE_EXT = /\.(tsx?|css)$/;
const GENERATED_CSS = "font-subset.css";
const WEIGHTS = [400, 700];
const FAMILY = "IBM Plex Sans JP Subset";
const OUT_DIR = path.join(ROOT, "public", "fonts");
const CSS_OUT = path.join(ROOT, "app", GENERATED_CSS);

const FONTSOURCE_DIR = path.join(ROOT, "node_modules/@fontsource/ibm-plex-sans-jp");

/** 主ソース: 和文＋欧文を 1 ファイルに含む "japanese" 版 */
const mainSource = (weight) =>
  path.join(FONTSOURCE_DIR, "files", `ibm-plex-sans-jp-japanese-${weight}-normal.woff2`);

/** 補助ソース: 主ソースに無い記号（→ ↗ ≈ など）を探す、unicode-range 分割版の各ファイル */
async function chunkSources(weight) {
  const css = await readFile(path.join(FONTSOURCE_DIR, `${weight}.css`), "utf8");
  const re = /url\(\.\/files\/([^)]+\.woff2)\)[^;]*;\s*unicode-range:\s*([^;]+);/g;
  const chunks = [];
  for (const [, file, ranges] of css.matchAll(re)) {
    const spans = ranges.split(",").map((part) => {
      const [a, b] = part.trim().replace(/^U\+/i, "").split("-");
      return [parseInt(a, 16), parseInt(b ?? a, 16)];
    });
    chunks.push({ file: path.join(FONTSOURCE_DIR, "files", file), spans });
  }
  return chunks;
}

const coverageCache = new Map();
async function coverage(file) {
  if (!coverageCache.has(file)) {
    const source = await readFile(file);
    const sfnt = await fontverter.convert(source, "sfnt");
    coverageCache.set(file, { source, unicodes: new Set(new Face(new Blob(sfnt), 0).collectUnicodes()) });
  }
  return coverageCache.get(file);
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return listFiles(full);
      return SOURCE_EXT.test(entry.name) && entry.name !== GENERATED_CSS ? [full] : [];
    }),
  );
  return nested.flat();
}

function charRange(from, to) {
  let s = "";
  for (let cp = from; cp <= to; cp++) s += String.fromCodePoint(cp);
  return s;
}

/** 本文に無くても入れておく文字: ASCII、全角記号、ひらがな・カタカナ、よく使う約物 */
const BASE_CHARS =
  charRange(0x20, 0x7e) + charRange(0x3000, 0x30ff) + charRange(0xff01, 0xff5e) + "・ー…‥—–−×≈";

/** コメント中の文字（罫線など）は描画されないので除く。URL の // は残す */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

function toUnicodeRange(codePoints) {
  const sorted = [...new Set(codePoints)].sort((a, b) => a - b);
  const hex = (n) => n.toString(16).toUpperCase();
  const parts = [];
  for (let i = 0; i < sorted.length; i++) {
    const start = sorted[i];
    let end = start;
    while (i + 1 < sorted.length && sorted[i + 1] === end + 1) end = sorted[++i];
    parts.push(start === end ? `U+${hex(start)}` : `U+${hex(start)}-${hex(end)}`);
  }
  return parts.join(", ");
}

async function main() {
  const files = (await Promise.all(SOURCE_DIRS.map((d) => listFiles(path.join(ROOT, d))))).flat();
  let text = "";
  for (const file of files) text += stripComments(await readFile(file, "utf8"));
  const codePoints = (str) => [...new Set([...str].map((ch) => ch.codePointAt(0)))].filter((cp) => cp >= 0x20);
  // 本文の文字は必ず探す。基本文字は主ソースにあるものだけ入れる（無い記号は探さない）
  const textChars = codePoints(text);
  const wanted = [...new Set([...codePoints(BASE_CHARS), ...textChars])];

  await mkdir(OUT_DIR, { recursive: true });
  for (const name of await readdir(OUT_DIR)) {
    if (/^plex-sans-jp-\d{3}-[0-9a-f]+\.woff2$/.test(name)) await rm(path.join(OUT_DIR, name));
  }

  const faces = [];
  for (const weight of WEIGHTS) {
    // 1) 主ソースで賄える文字 → 2) 残りを分割版のどのファイルが持つか探して振り分け
    const groups = new Map();
    const main = await coverage(mainSource(weight));
    groups.set(mainSource(weight), wanted.filter((cp) => main.unicodes.has(cp)));

    const leftovers = textChars.filter((cp) => !main.unicodes.has(cp));
    const chunks = await chunkSources(weight);
    const unresolved = [];
    for (const cp of leftovers) {
      let placed = false;
      for (const chunk of chunks) {
        if (!chunk.spans.some(([a, b]) => cp >= a && cp <= b)) continue;
        if (!(await coverage(chunk.file)).unicodes.has(cp)) continue;
        groups.set(chunk.file, [...(groups.get(chunk.file) ?? []), cp]);
        placed = true;
        break;
      }
      if (!placed) unresolved.push(cp);
    }

    for (const [file, cps] of groups) {
      if (cps.length === 0) continue;
      const { source } = await coverage(file);
      const subset = await subsetFont(source, String.fromCodePoint(...cps), { targetFormat: "woff2" });
      const hash = createHash("sha256").update(subset).digest("hex").slice(0, 10);
      const name = `plex-sans-jp-${weight}-${hash}.woff2`;
      await writeFile(path.join(OUT_DIR, name), subset);
      faces.push({ weight, file: name, range: toUnicodeRange(cps), chars: cps.length, bytes: subset.length });
    }

    const printable = unresolved.filter((cp) => cp > 0x7e);
    if (printable.length > 0) {
      const list = printable.map((cp) => `${String.fromCodePoint(cp)}(U+${cp.toString(16).toUpperCase()})`);
      console.log(`[${weight}] フォントに無い文字（システムフォントで表示）: ${list.join(" ")}`);
    }
  }

  const blocks = faces.map((f) =>
    [
      "@font-face {",
      `  font-family: "${FAMILY}";`,
      "  font-style: normal;",
      `  font-weight: ${f.weight};`,
      "  font-display: swap;",
      `  src: url("/fonts/${f.file}") format("woff2");`,
      `  unicode-range: ${f.range};`,
      "}",
    ].join("\n"),
  );
  const header =
    "/* 自動生成ファイル: scripts/subset-fonts.mjs（npm run fonts:subset）。手で編集しない。 */";
  await writeFile(CSS_OUT, `${header}\n\n${blocks.join("\n\n")}\n`);

  for (const f of faces) {
    console.log(`${f.file}  ${f.chars} chars  ${(f.bytes / 1024).toFixed(1)} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
