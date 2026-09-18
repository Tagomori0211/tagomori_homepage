import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tagomori | Homelab 観測と改善の記録",
  description:
    "自宅ラボを観測し、判断し、改善する。公開サイトの配信鎖と物理構成の要約、blameless な運用の記録。",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <a className="brand" href="/">
              Tagomori
            </a>
            <nav className="nav" aria-label="主要ナビ">
              <a href="#story">ストーリー</a>
              <a href="#chains">二層の鎖</a>
              <a href="#ops">運用</a>
              <a href="#reproduce">再現</a>
              <a href="#contact">連絡</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <p>
            © Tagomori ·{" "}
            <a
              href="https://github.com/Tagomori0211/tagomori_homepage"
              rel="noopener noreferrer"
              target="_blank"
            >
              tagomori_homepage
            </a>
            {" · "}
            <a
              href="https://github.com/Tagomori0211/tagomori-homelab"
              rel="noopener noreferrer"
              target="_blank"
            >
              tagomori-homelab
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
