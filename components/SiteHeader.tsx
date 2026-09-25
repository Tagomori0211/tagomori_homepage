import BrandMark from "@/components/BrandMark";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import { GitHubIcon } from "@/components/icons";
import { GITHUB_URL, GITHUB_USER } from "@/data/repos";
import { PROFILE, SHEETS } from "@/data/site";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        {/* 1 ページ構成なので、ロゴはページ先頭へのアンカー（Link の先読み通信を発生させない） */}
        <a className="brand" href="#top">
          <BrandMark />
          <span className="brand-text">
            <span className="brand-name">{PROFILE.name}</span>
            <span className="brand-en mono">{PROFILE.nameEn.toUpperCase()}</span>
          </span>
        </a>

        <SiteNav sheets={SHEETS} />

        <div className="header-actions">
          <ThemeToggle />
          <a
            className="icon-btn"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub: ${GITHUB_USER}（新しいタブで開く）`}
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
