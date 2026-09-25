import { milestones } from "@/data/timeline";

/** 図面の改訂記号（三角形 + 英字）。重要な改訂は塗りつぶす */
function RevMark({ letter, filled }: { letter: string; filled?: boolean }) {
  return (
    <svg className={filled ? "rev-mark is-filled" : "rev-mark"} viewBox="0 0 30 26" aria-hidden="true">
      <path d="M15 2 28 24H2Z" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="15" y="20" textAnchor="middle">
        {letter}
      </text>
    </svg>
  );
}

/** 学習の軌跡 = 改訂履歴表（REV / 日付 / 内容） */
export default function Timeline() {
  return (
    <div className="revs">
      <div className="revs-head mono" aria-hidden="true">
        <span>REV</span>
        <span>DATE</span>
        <span>DESCRIPTION</span>
      </div>
      <ol className="revs-list" aria-label="学習・構築の軌跡">
        {milestones.map((m, i) => {
          const letter = String.fromCharCode(65 + i);
          return (
            <li key={m.date + m.title} className={m.highlight ? "rev is-hl" : "rev"}>
              <span className="rev-col-mark">
                <RevMark letter={letter} filled={m.highlight} />
                <span className="visually-hidden">改訂 {letter}</span>
              </span>
              <span className="rev-date mono">{m.date}</span>
              <div className="rev-body">
                <h3 className="rev-title">{m.title.trim()}</h3>
                <p className="rev-desc">{m.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
