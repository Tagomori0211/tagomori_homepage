import { GITHUB_URL, type Repo } from "@/data/repos";

/** その他のリポジトリ = 部品表（BOM）。1 行 = 1 リポジトリへのリンク */
export default function RepoTable({ repos, offset = 0 }: { repos: Repo[]; offset?: number }) {
  return (
    <div className="bom">
      <p className="bom-caption mono">PARTS LIST — その他の公開リポジトリ</p>
      <div className="bom-head mono" aria-hidden="true">
        <span>NO.</span>
        <span>REPOSITORY</span>
        <span>DESCRIPTION</span>
        <span>LANG</span>
        <span>UPDATED</span>
      </div>
      <ol className="bom-list">
        {repos.map((r, i) => (
          <li key={r.name}>
            <a
              className="bom-row"
              href={`${GITHUB_URL}/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bom-no mono" aria-hidden="true">
                P-{String(offset + i + 1).padStart(2, "0")}
              </span>
              <span className="bom-name mono">
                {r.name}
                <span className="bom-arrow" aria-hidden="true">
                  {" "}
                  ↗
                </span>
              </span>
              <span className="bom-desc">{r.description}</span>
              <span className="bom-lang mono">
                <span className="lang-dot" style={{ background: r.color }} aria-hidden="true" />
                {r.language}
              </span>
              <span className="bom-date mono">{r.updated}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
