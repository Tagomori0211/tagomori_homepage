/**
 * 技術スタックと認定資格
 * カテゴリごとにスキルをグループ化。採用担当が一覧で把握できる粒度。
 */
export type SkillCategory = {
  name: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "IaC / 構成管理",
    skills: ["Terraform (HCL)", "Ansible"],
  },
  {
    name: "コンテナ / オーケストレーション",
    skills: ["Docker", "Kubernetes (k3s)", "Helm"],
  },
  {
    name: "監視 / 可観測性",
    skills: ["VictoriaMetrics", "Grafana" ],
  },
  {
    name: "CI/CD / デリバリ",
    skills: ["GitHub Actions", "GHCR", "Cloudflare Tunnel"],
  },
  {
    name: "ネットワーク",
    skills: ["10GbE デイジーチェーン", "Tailscale (WireGuard)", "nginx"],
  },
  {
    name: "仮想化 / OS",
    skills: ["Proxmox VE", "Linux (Ubuntu/Debian)"],
  },
  {
    name: "クラウド",
    skills: ["Google Cloud Platform"],
  },
  {
    name: "言語 / フレームワーク",
    skills: ["Python", "Dart", "Flutter", "HCL"],
  },
];

export type Certification = {
  name: string;
  issuer: string;
};

export const certifications: Certification[] = [
//  {
//    name: "Associate Cloud Engineer ",
//    issuer: "Google Cloud",
//  },
];
