# tagomori_homepage

**田籠0211（HN）** の公開ホームページ本体です。
自宅ラボ（homelab）を観測し、判断し、改善した記録を、Next.js の静的エクスポートとして配信します。

[![deploy-homepage](https://github.com/Tagomori0211/tagomori_homepage/actions/workflows/deploy-homepage.yml/badge.svg)](https://github.com/Tagomori0211/tagomori_homepage/actions/workflows/deploy-homepage.yml)
[![dry-run-connectivity](https://github.com/Tagomori0211/tagomori_homepage/actions/workflows/dry-run-connectivity.yml/badge.svg)](https://github.com/Tagomori0211/tagomori_homepage/actions/workflows/dry-run-connectivity.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Tagomori0211/tagomori_homepage)](https://github.com/Tagomori0211/tagomori_homepage/commits/main)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-multi--stage-2496ED?logo=docker&logoColor=white)](./Dockerfile)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-k3s-326CE5?logo=kubernetes&logoColor=white)](./k8s/homepage)
[![nginx](https://img.shields.io/badge/nginx-alpine-009639?logo=nginx&logoColor=white)](./nginx.conf)
[![Cloudflare Tunnel](https://img.shields.io/badge/Cloudflare-Tunnel-F38020?logo=cloudflare&logoColor=white)](./k8s/homepage/cloudflared-deployment.yaml)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](./.github/workflows)

---

## このサイトが示すこと

- **ケーススタディ**: 観測 → 判断 → 改善。コスト約 4.5 倍まで膨らんだ Minecraft ワークロードの構成を GKE から GCE + Docker Compose へ切り替え、月間コストを約 75% 削減。振り返りは blameless。
- **公開サイト・デプロイ・物理ネットワーク**
  - 公開サイト: 訪問者 → Cloudflare Tunnel → cloudflared → Service → nginx Pod
  - デプロイ: git push → GitHub Actions（build）→ GHCR → Tailscale → k3s（set image → rollout）
  - 物理ネットワーク: 要約のみ。正本は [tagomori-homelab](https://github.com/Tagomori0211/tagomori-homelab) の README（TX2540 M1 → Ryzen 5700G、10GbE デイジーチェーン、ノード選定・コスト試算など）
- **プロジェクト一覧**: GitHub の公開リポジトリへのリンク（`data/repos.ts` で管理。追加・説明変更はこのファイルだけ直す）
- 障害・運用の短い原則、秘密を含まない再現手順、連絡導線

ゲーム宣伝や監視ダッシュボードの実装そのものはこのリポの範囲外です（それぞれ別リポで管理）。

## アーキテクチャ

```mermaid
flowchart LR
    Visitor([訪問者]) -->|HTTPS| CF[Cloudflare Tunnel]
    CF -->|outbound tunnel| CFD[cloudflared Pod]
    CFD -->|Service| Web[homepage-web / nginx:alpine]
    Web -->|static files| Out[out/ 静的エクスポート]

    subgraph k3s["k3s クラスタ（自宅ラボ）"]
        CFD
        Web
    end
```

インバウンドポートは開けません。`cloudflared` がアウトバウンドで Tunnel を張り、Service 経由で nginx の静的ファイルを返す構成です。秘密・証明書・トンネル資格情報はリポに含まれません。

## サイト構成

| § | セクション | 内容 |
|---|-----------|------|
ページ冒頭は表題欄つきのヒーローと、根拠のシートへリンクする主要な数字。

| SHEET | セクション | 内容 |
|---|-----------|------|
| 01 | 自己紹介 | 経歴・学歴・志望動機 |
| 02 | ケーススタディ | GKE 廃止で関連コスト約 75% 削減（Before / After と 観測 → 判断 → 改善） |
| 03 | 構成図 | 公開サイトの論理パス / CI/CD パイプライン / 物理ネットワーク |
| 04 | プロジェクト | 注目リポジトリ 3 件 + 部品表（その他の公開リポジトリ） |
| 05 | 技術スタック | TAK Stack とカテゴリ別スキル |
| 06 | 学習の軌跡 | 改訂履歴形式のマイルストーン |
| 07 | 障害・運用の原則 | blameless な運用ポリシー |
| 08 | 当サイトのデプロイ手順 | 秘密なしで再現できるビルド・配信手順 |
| 09 | 連絡 | メール / GitHub / X / Issues |

アンカー ID（`#about` `#story` `#chains` など）は旧構成から変えていないので、既存の共有リンクはそのまま使えます。

## 技術方針

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16 (App Router) |
| 出力 | `output: 'export'`（静的 `out/`） |
| 画像 | `images.unoptimized: true` |
| 言語 | TypeScript + シンプルな CSS（外部 CDN に依存しない） |
| デザイン | 「図面」モチーフ。ライト = 製図用紙 / ダーク = 青焼き（OS 設定に追従 + 手動切替）。印刷すると履歴書風の A4 レイアウトになる |
| フォント | IBM Plex Sans JP / IBM Plex Mono を npm（@fontsource）から自己ホスト。和文はサイト内の文字だけにサブセット化（`npm run fonts:subset`） |
| SEO | OGP 画像・favicon・`robots.txt`・`sitemap.xml`・JSON-LD（Person）を静的に出力 |
| Lint | ESLint 9（flat config, `eslint-config-next`） |
| パッケージ | npm（lockfile あり） |
| コンテナ | multi-stage: `next build` → `nginx:alpine` で `out/` 配信 |
| 配信 | k3s（自宅ラボ）→ Cloudflare Tunnel（インバウンドポート開放なし） |
| CI/CD | GitHub Actions（`deploy-homepage`, `dry-run-connectivity`） |

## ローカルビルド

要件: **Node.js 20+**

```bash
npm install
npm run build   # → out/ に静的ファイルが生成される
npm run lint    # ESLint
```

本文（`app/` `components/` `data/`）の文字を増やしたら、フォントのサブセットを作り直してコミットしてください（忘れても、足りない文字は @fontsource の分割フォントが自動で補うので表示は崩れません）。

```bash
npm run fonts:subset   # → public/fonts/*.woff2 と app/font-subset.css を再生成
```

開発サーバ（任意）:

```bash
npm run dev
```

## Docker

```bash
docker build -t tagomori-homepage .
docker run --rm -p 8080:80 tagomori-homepage
# → http://localhost:8080/
```

秘密・`.env`・トンネル資格情報はイメージに含めません。

## デプロイ

```bash
kubectl apply -f k8s/homepage/
```

`push` すると GitHub Actions が GHCR にイメージを積み、Tailscale 経由で k3s に apply します。詳細は [docs/iap-deploy.md](./docs/iap-deploy.md)（値・トークンなしの設計メモ）を参照してください。

## 関連リポジトリ

| リポジトリ | 説明 |
|-----------|------|
| [tagomori-homelab](https://github.com/Tagomori0211/tagomori-homelab) | 自宅ラボの物理構成図。10GbE デイジーチェーン、ノード選定、コスト試算の正本 |
| [Minecraft-on-Kubernetes](https://github.com/Tagomori0211/Minecraft-on-Kubernetes) | Minecraft クラスタ運用。Terraform (HCL) と Kubernetes による IaC 管理 |
| [cloud-observability-gateway](https://github.com/Tagomori0211/cloud-observability-gateway) | Flutter を用いたクロスプラットフォーム監視ダッシュボード基盤 |

全リポジトリは [github.com/Tagomori0211](https://github.com/Tagomori0211?tab=repositories) から確認できます。

## ライセンス

MIT — 詳細はリポジトリルートの [LICENSE](./LICENSE) を参照。
