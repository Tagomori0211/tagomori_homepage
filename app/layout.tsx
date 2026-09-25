import type { Metadata, Viewport } from "next";
// 和文: サイト内の文字だけに絞ったサブセット（scripts/subset-fonts.mjs で生成）を優先し、
// 足りない文字だけ @fontsource の unicode-range 分割版で補う。欧文等幅は IBM Plex Mono。
import "@fontsource/ibm-plex-sans-jp/400.css";
import "@fontsource/ibm-plex-sans-jp/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./font-subset.css";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { X_HANDLE } from "@/data/repos";
import { PROFILE, SITE_URL } from "@/data/site";

const TITLE = `${PROFILE.name} — インフラエンジニア / SRE ポートフォリオ`;
const DESCRIPTION =
  "田籠0211（HN／Tagomori0211）のポートフォリオ。未経験から約 2 週間で k3s クラスタを構築し、Terraform / Ansible / Kubernetes による IaC と VictoriaMetrics / Grafana の監視基盤を自宅ラボで運用。GKE 廃止による関連コスト約 75% 削減の事例も。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  authors: [{ name: PROFILE.name }],
  openGraph: {
    title: TITLE,
    description:
      "自宅ラボでサーバーを運用するインフラエンジニア志望。IaC・監視・CI/CD の実践記録と公開プロジェクト。",
    url: "/",
    siteName: "tagomori.dev",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    creator: `@${X_HANDLE}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1f36" },
  ],
};

/** 保存済みテーマを描画前に反映し、ちらつき（FOUC）を防ぐ */
const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          本文へスキップ
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
