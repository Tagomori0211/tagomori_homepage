import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB_URL, GITHUB_USER, X_HANDLE } from "@/data/repos";
import "./globals.css";

export const metadata: Metadata = {
  title: "田籠0211 — ポートフォリオ",
  description:
    "田籠0211（HN／Tagomori0211）のポートフォリオ。未経験から約2週間で k3s 環境を構築。Terraform/Ansible/Kubernetes による IaC、VictoriaMetrics/Grafana 監視基盤",
  robots: { index: true, follow: true },
  openGraph: {
    title: "田籠0211 — インフラエンジニアポートフォリオ",
    description:
      "自宅ラボでサーバーを運用するインフラエンジニア志望。IaC・監視・CI/CD の実践記録と公開プロジェクト。",
    type: "website",
    locale: "ja_JP",
  },
};

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#timeline", label: "Timeline" },
  { href: "#projects", label: "Projects" },
  { href: "#story", label: "Story" },
  { href: "#contact", label: "Contact" },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <a className="skip-link" href="#main">
          本文へスキップ
        </a>
        <header className="site-header">
          <div className="container site-header-inner">
            <Link className="brand" href="/">
              <span className="brand-dot" aria-hidden="true" />
              <span className="brand-name">Tagomori0211</span>
              <span className="brand-sub">homelab / ops</span>
            </Link>
            <nav className="nav" aria-label="主要ナビ">
              {NAV.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              className="header-gh"
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
              aria-label={`GitHub: ${GITHUB_USER}`}
            >
              <GitHubIcon />
              <span>{GITHUB_USER}</span>
            </a>
          </div>
        </header>

        <div id="main">{children}</div>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <p className="footer-brand">田籠0211（HN）</p>
              <p className="footer-meta">
                インフラエンジニア志望 · Kitakyushu · 静的サイトを k3s から Cloudflare Tunnel 経由で配信
              </p>
            </div>
            <ul className="footer-links">
              <li>
                <a href={GITHUB_URL} rel="noopener noreferrer" target="_blank">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`https://x.com/${X_HANDLE}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  X (@{X_HANDLE})
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_URL}/tagomori_homepage`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  このサイトのソース
                </a>
              </li>
            </ul>
          </div>
          <div className="container footer-copy">
            <span>© {new Date().getFullYear()} 田籠0211</span>
            <span className="mono">next export → nginx:alpine → k3s</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
