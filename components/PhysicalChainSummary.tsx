import { GITHUB_URL } from "@/data/repos";

/** 物理ネットワークの要約（正本は tagomori-homelab）。ラック立面図ふうに上流→下流で並べる */
const RACK = [
  { name: "ONU / 10G Router", role: "上流", link: "10GbE" },
  { name: "TX2540 M1", role: "bridge · ストレージ", link: "10GbE" },
  { name: "Ryzen 5700G", role: "bridge · k3s worker", link: "10GbE", accent: true },
  { name: "メイン PC", role: "端末", side: "1G 側: AP / Printer / ほか" },
];

export default function PhysicalChainSummary() {
  return (
    <div className="phys">
      <ol className="rack" aria-label="物理ノード（上流から下流へ）">
        {RACK.map((r, i) => (
          <li key={r.name} className="rack-item">
            <div className={r.accent ? "rack-unit is-accent" : "rack-unit"}>
              <span className="rack-idx mono" aria-hidden="true">
                U{String(i + 1).padStart(2, "0")}
              </span>
              <span className="rack-body">
                <span className="rack-name">{r.name}</span>
                <span className="rack-role mono">{r.role}</span>
              </span>
              <span className="rack-leds" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
            {r.link ? (
              <span className="rack-link mono">
                <span className="visually-hidden">次のノードへ </span>
                {r.link}
              </span>
            ) : null}
            {r.side ? <span className="rack-side mono">{r.side}</span> : null}
          </li>
        ))}
      </ol>

      <p className="flow-print print-only">
        {RACK.map((r) => r.name).join(" → ")}（10GbE デイジーチェーン）
      </p>

      <div className="phys-notes">
        <p>
          10GbE はスイッチレスの<strong>デイジーチェーン（ブリッジ）</strong>。PoE
          スイッチはコスト・設置制約から不採用。単一障害点が増えるのは承知の上で、コスト優先で受容したリスクです。
        </p>
        <p className="phys-ref">
          配線図・コスト試算・ノード選定理由の詳細は{" "}
          <a href={`${GITHUB_URL}/tagomori-homelab`} target="_blank" rel="noopener noreferrer">
            tagomori-homelab
          </a>{" "}
          の README。ここは要約のみ。
        </p>
      </div>
    </div>
  );
}
