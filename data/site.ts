/**
 * サイト全体の基本情報と「図面（シート）」構成。
 * 名前・連絡先・URL・セクション番号の表記ゆれを防ぐため、ここだけで管理する。
 */
export const SITE_URL = "https://tagomori.dev";

export const PROFILE = {
  name: "田籠0211",
  nameEn: "Tagomori0211",
  reading: "たごもり",
  role: "インフラエンジニア / SRE",
  location: "福岡県 北九州市",
  city: "北九州市",
  email: "tagomoriyuukichi@gmail.com",
} as const;

export type Sheet = {
  /** アンカー ID（既存の共有リンクを壊さないよう旧 ID を維持） */
  id: string;
  no: string;
  label: string;
  en: string;
  /** ヘッダーのナビに出すか（モバイルの目次には全シートを出す） */
  nav?: boolean;
};

export const SHEETS: Sheet[] = [
  { id: "about", no: "01", label: "自己紹介", en: "PROFILE", nav: true },
  { id: "story", no: "02", label: "ケーススタディ", en: "CASE STUDY", nav: true },
  { id: "chains", no: "03", label: "構成図", en: "ARCHITECTURE", nav: true },
  { id: "projects", no: "04", label: "プロジェクト", en: "PROJECTS", nav: true },
  { id: "skills", no: "05", label: "技術スタック", en: "TECH STACK", nav: true },
  { id: "timeline", no: "06", label: "学習の軌跡", en: "REVISION HISTORY" },
  { id: "ops", no: "07", label: "障害・運用の原則", en: "NOTES" },
  { id: "reproduce", no: "08", label: "デプロイ手順", en: "REPRODUCE" },
  { id: "contact", no: "09", label: "連絡", en: "CONTACT", nav: true },
];

export function sheet(id: string): Sheet {
  const found = SHEETS.find((s) => s.id === id);
  if (!found) throw new Error(`unknown sheet: ${id}`);
  return found;
}

/** ビルド時点の年月（JST）。フッターの REV 表記に使う */
export function buildRevision(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "";
  const m = parts.find((p) => p.type === "month")?.value ?? "";
  return `${y}.${m}`;
}
