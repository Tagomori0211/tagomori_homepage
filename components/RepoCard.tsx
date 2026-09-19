import { GITHUB_URL, type Repo } from "@/data/repos";

export default function RepoCard({ repo }: { repo: Repo }) {
  const url = `${GITHUB_URL}/${repo.name}`;
  return (
    <a
      className={repo.featured ? "repo-card featured" : "repo-card"}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="repo-head">
        <span className="repo-name mono">{repo.name}</span>
        <span className="repo-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <p className="repo-desc">{repo.description}</p>
      <div className="repo-foot">
        <span className="repo-lang">
          <span className="lang-dot" style={{ background: repo.color }} aria-hidden="true" />
          {repo.language}
        </span>
        <span className="repo-updated mono">updated {repo.updated}</span>
      </div>
      <ul className="repo-tags" aria-label="タグ">
        {repo.tags.map((t) => (
          <li key={t} className="mono">
            {t}
          </li>
        ))}
      </ul>
    </a>
  );
}
