/**
 * 学習・構築の軌跡
 * 未経験からの成長速度を採用担当に示すためのマイルストーン。
 */
export type Milestone = {
  date: string;
  title: string;
  description: string;
  highlight?: boolean;
};

export const milestones: Milestone[] = [
  {
    date: "2025.11",
    title: "インフラ学習開始",
    description:
      "完全未経験から Terraform・Ansible・Kubernetes の学習に着手。複数の LLM を並列活用し、検証とバイアス補正を行う「敵対的デバッグ」手法を確立。",
  },
  {
    date: "約 2 週間後",
    title: "k3s 環境をデプロイ",
    description:
      "Terraform → Ansible → k3s の一貫（TAK Stack）で設計・構築。VictoriaMetrics / Grafana による監視基盤を含む環境を自宅ラボ上に展開。",
    highlight: true,
  },
  {
    date: "2025.12",
    title: "Minecraft サーバーを k8s 移行・運用",
    description:
      "コミュニティ向け Minecraft サーバーを k3s 上に移行し、HCL による IaC 管理を確立。運用を開始。",
  },
  {
    date: "2026.06",
    title: "監視ダッシュボード基盤を設計",
    description:
      "Flutter を用いたクロスプラットフォーム監視ダッシュボード基盤（cloud-observability-gateway）を設計・開発。",
    },
  {
    date: "2026.09",
    title: "ポートフォリオサイト公開",
    description:
      "Next.js 静的エクスポート → nginx → k3s → Cloudflare Tunnel の配信鎖を構築。GitHub Actions と Tailscale 経由のデプロイを自動化し、このサイト自体をインフラ実績として公開。",
      //highlight: true
    },
];
