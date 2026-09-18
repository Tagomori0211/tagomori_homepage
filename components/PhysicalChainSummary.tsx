/** 物理鎖の要約（正本は tagomori-homelab） */
export default function PhysicalChainSummary() {
  return (
    <div className="card">
      <p>
        物理層の正本は{" "}
        <a
          href="https://github.com/Tagomori0211/tagomori-homelab"
          rel="noopener noreferrer"
          target="_blank"
        >
          tagomori-homelab
        </a>{" "}
        の README です。ここでは要約のみ示します。
      </p>
      <ul className="chain-list" aria-label="物理ノード要約">
        <li>
          <span className="node">TX2540M1</span>
          <span className="sep">→</span>
          <span className="node">Ryzen 5700G</span>
          <span className="sep">→</span>
          <span className="node">メイン PC</span>
        </li>
      </ul>
      <p className="note">
        10G はスイッチレスのデイジーチェーン（ブリッジ）。PoE
        スイッチはコスト・設置制約から不採用。詳細・配線図・コスト試算は正本リポを参照。
      </p>
      <pre className="mono" aria-label="物理鎖 ASCII 要約">
{`ONU / 10G Router
        │ 10G
   TX2540M1 (bridge)
        │ 10G
  Ryzen 5700G (bridge)
        │ 10G
     メイン PC
        │
   1G 側: AP / Printer / ほか`}
      </pre>
    </div>
  );
}
