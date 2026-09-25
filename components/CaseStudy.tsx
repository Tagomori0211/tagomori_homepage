import { GITHUB_URL } from "@/data/repos";

const STEPS = [
  {
    no: "1",
    tag: "観測",
    title: "数字を並べる",
    body: "月間の電気代・回線費・稼働率・実際に使われた時間を同じ表に置いた。VictoriaMetrics のデータと GCP 課金データを突き合わせ、感覚ではなく「何に、いくら、どれだけ使ったか」を把握した。",
  },
  {
    no: "2",
    tag: "判断",
    title: "維持より廃止",
    body: "GKE を使用してマネージドサービスの恩恵を受けていたが、Minecraft プロキシには過剰であり、コストが高すぎた。そのため GCE での Docker Compose 運用に切り替え、GKE を廃止する判断を下した。",
  },
  {
    no: "3",
    tag: "改善",
    title: "−75% と基準の文書化",
    body: "余剰を削り、月間の関連コストはおよそ 75% 減。Blameless な振り返りで「次に同じ判断を迫られたときの基準」を文書化し、再発防止策をリポジトリに残した。",
  },
];

/** ケーススタディ: Before / After の比較図 + 観測→判断→改善の 3 工程 */
export default function CaseStudy() {
  return (
    <div className="case">
      <figure className="ba crop" aria-label="移行前後の比較">
        <div className="ba-cell is-before">
          <p className="ba-tag mono">BEFORE</p>
          <p className="ba-title">GKE</p>
          <p className="ba-sub">マネージド Kubernetes 上の Minecraft プロキシ</p>
          <p className="ba-figure mono">×4.5</p>
          <p className="ba-note">月間の運用コスト（電気代・回線費を含む）が予想のおよそ 4.5 倍</p>
        </div>

        <div className="ba-arrow" aria-hidden="true">
          <span className="ba-arrow-label mono">観測 → 判断 → 改善</span>
          <span className="ba-arrow-line" />
        </div>

        <div className="ba-cell is-after">
          <p className="ba-tag mono">AFTER</p>
          <p className="ba-title">GCE + Docker Compose</p>
          <p className="ba-sub">GKE を廃止し、余剰を削った構成</p>
          <p className="ba-figure mono">−75%</p>
          <p className="ba-note">月間の関連コスト</p>
          <div className="ba-bars" role="img" aria-label="関連コスト: 移行前を 100 とすると、移行後はおよそ 25">
            <span className="ba-bar">
              <span className="ba-bar-label mono">移行前</span>
              <span className="ba-bar-track">
                <span className="ba-bar-fill is-before" style={{ width: "100%" }} />
              </span>
              <span className="ba-bar-value mono">100</span>
            </span>
            <span className="ba-bar">
              <span className="ba-bar-label mono">移行後</span>
              <span className="ba-bar-track">
                <span className="ba-bar-fill is-after" style={{ width: "25%" }} />
              </span>
              <span className="ba-bar-value mono">≈25</span>
            </span>
          </div>
        </div>
      </figure>

      <ol className="steps3" aria-label="観測・判断・改善の 3 工程">
        {STEPS.map((s) => (
          <li key={s.no} className="step">
            <div className="step-head">
              <span className="balloon mono" aria-hidden="true">
                {s.no}
              </span>
              <span className="step-tag mono">{s.tag}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>

      <aside className="callout">
        <p className="callout-tag mono">NOTE</p>
        <div>
          <p>
            この判断プロセスは、規模に関わらず同じフレームワークが適用できると考えています。「観測→判断→改善」のサイクルを言語化し、チームで共有可能な基準に落とし込むことが重要です。
          </p>
          <p className="callout-link mono">
            関連リポジトリ:{" "}
            <a href={`${GITHUB_URL}/Minecraft-on-Kubernetes`} target="_blank" rel="noopener noreferrer">
              Minecraft-on-Kubernetes ↗
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
}
