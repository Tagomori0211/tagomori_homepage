import { GITHUB_URL, type Repo } from "@/data/repos";

/** 注目リポジトリのカード（図面の部品詳細図ふう）。P-01 などは表示用の部品番号 */
export default function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const url = `${GITHUB_URL}/${repo.name}`;
  return (
    <a className="part" href={url} target="_blank" rel="noopener noreferrer">
      <span className="part-head mono">
        <span>P-{String(index + 1).padStart(2, "0")}</span>
        <span className="part-lang">
          <span className="lang-dot" style={{ background: repo.color }} aria-hidden="true" />
          {repo.language}
        </span>
      </span>
      <span className="part-name mono">{repo.name}</span>
      <span className="part-desc">{repo.description}</span>
      <span className="part-tags">
        {repo.tags.map((t) => (
          <span key={t} className="part-tag mono">
            {t}
          </span>
        ))}
      </span>
      <span className="part-foot mono">
        <span>updated {repo.updated}</span>
        <span className="part-open" aria-hidden="true">
          GitHub ↗
        </span>
      </span>
    </a>
  );
}
