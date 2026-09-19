/**
 * GitHub 公開リポジトリ一覧（github.com/Tagomori0211）
 * 説明文は各リポの description をそのまま転記。更新時はここだけ直せばよい。
 */
export type Repo = {
  name: string;
  description: string;
  language: string;
  /** GitHub の言語カラー */
  color: string;
  /** 最終 push の年月（表示用） */
  updated: string;
  featured?: boolean;
  tags: string[];
};

export const GITHUB_USER = "Tagomori0211";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
export const X_HANDLE = "Tagomori_game";

export const repos: Repo[] = [
  {
    name: "tagomori-homelab",
    description: "自宅ラボの物理構成図。10G デイジーチェーン、ノード選定、コスト試算の正本。",
    language: "Mermaid",
    color: "#ff3670",
    updated: "2026-06",
    featured: true,
    tags: ["homelab", "network", "docs"],
  },
  {
    name: "Minecraft-on-Kubernetes",
    description: "Minecraft クラスタ運用リポジトリ。Terraform (HCL) と Kubernetes でゲームサーバを IaC 管理。",
    language: "HCL",
    color: "#844FBA",
    updated: "2026-09",
    featured: true,
    tags: ["kubernetes", "terraform", "gameserver"],
  },
  {
    name: "cloud-observability-gateway",
    description:
      "時系列データベースからデータを安全に抽出・可視化するための、gRPC-Web / Ktor を用いた高セキュアな監視ダッシュボード基盤。",
    language: "Dart",
    color: "#00B4AB",
    updated: "2026-09",
    featured: true,
    tags: ["observability", "grpc-web", "ktor"],
  },
  {
    name: "tagomori_homepage",
    description: "このサイト。Next.js 静的エクスポート → nginx → k3s。Cloudflare Tunnel 経由で配信。",
    language: "TypeScript",
    color: "#3178c6",
    updated: "2026-09",
    tags: ["nextjs", "k3s", "cloudflare-tunnel"],
  },
  {
    name: "DoubleEdge",
    description:
      "DeepSeek V4 Pro をコントロールプレーンに、AG×3 を並列実行エンジンに、Claude Code を整合・結合・却下レイヤーに据えた、敵対ロール付与によるグループシンク回避エージェントループ。",
    language: "JavaScript",
    color: "#f1e05a",
    updated: "2026-06",
    tags: ["agents", "llm"],
  },
  {
    name: "Aiwass-Magick",
    description:
      "DeepSeek の JSON 出力に特化した、完全コンテナ化ローカルファースト知識探索 OS。FastAPI の構造化レスポンスと React のチップ UI。",
    language: "JavaScript",
    color: "#f1e05a",
    updated: "2026-06",
    tags: ["fastapi", "react", "local-first"],
  },
  {
    name: "Project-GOZEN",
    description: "AI オーケストレーションによる御前会議を模した意思決定およびコーディング統合 AI エージェント。",
    language: "Python",
    color: "#3572A5",
    updated: "2026-02",
    tags: ["agents", "python"],
  },
  {
    name: "misskey_summarizer",
    description: "Misskey サーバーのローカルタイムラインを集計し、Gemini で要約して投稿する bot。",
    language: "Python",
    color: "#3572A5",
    updated: "2026-01",
    tags: ["bot", "misskey", "gemini"],
  },
];
