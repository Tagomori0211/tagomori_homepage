import { GITHUB_URL } from "@/data/repos";

/** 物理鎖の要約（正本は tagomori-homelab） */
const RACK = [
  { name: "ONU / 10G Router", role: "上流", link: "10G" },
  { name: "TX2540M1", role: "bridge · ストレージ", link: "10G" },
  { name: "Ryzen 5700G", role: "bridge · k3s worker", link: "10G" },
  { name: "メイン PC", role: "端末", link: "1G 側: AP / Printer / ほか" },
];

export default function PhysicalChainSummary() {
  return (
    <div className="rack-wrap">
      <ol className="rack" aria-label="物理ノード要約（上流から下流へ）">
        {RACK.map((r, i) => (
          <li key={r.name} className="rack-item">
            <span className="rack-idx mono">{String(i + 1).padStart(2, "0")}</span>
            <div className="rack-body">
              <span className="rack-name">{r.name}</span>
              <span className="rack-role">{r.role}</span>
            </div>
            {i < RACK.length - 1 ? (
              <span className="rack-link mono" aria-label={`次ホップへ ${r.link}`}>
                ↓ {r.link}
              </span>
            ) : (
              <span className="rack-link mono muted">{r.link}</span>
            )}
          </li>
        ))}
      </ol>
      <div className="rack-notes">
        <p>
          10G はスイッチレスの<strong>デイジーチェーン（ブリッジ）</strong>。PoE スイッチはコスト・設置制約から不採用。
          単一障害点が増えるのは承知の上で、コスト優先で受容したリスクです。
        </p>
        <p className="note">
          配線図・コスト試算・ノード選定理由の正本は{" "}
          <a href={`${GITHUB_URL}/tagomori-homelab`} rel="noopener noreferrer" target="_blank">
            tagomori-homelab
          </a>{" "}
          の README。ここは要約のみ。
        </p>
      </div>
    </div>
  );
}
