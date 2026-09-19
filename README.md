# tagomori_homepage

Tagomori の**公開ホームページ**本体です。  
自宅ラボ（homelab）を観測し、判断し、改善した記録を、Next.js の静的エクスポートとして配信します。

## このサイトが示すこと

- **旗艦ストーリー**: 観測 → 判断 → 改善。コスト約 4.5 倍まで膨らんだ構成を廃止し、約 75% 削減。振り返りは blameless。
- **二層の鎖**
  - 公開サイト鎖: 訪問者 → Cloudflare Tunnel → cloudflared → Pod → ノード
  - 物理鎖: 要約のみ。正本は [tagomori-homelab](https://github.com/Tagomori0211/tagomori-homelab) の README（TX2540M1 → Ryzen 5700G → メイン、10G デイジー、PoE 不採用など）
- **プロジェクト一覧**: GitHub の公開リポジトリ 8 件へのリンク（`data/repos.ts` で管理。追加・説明変更はこのファイルだけ直す）
- 障害・運用の短い原則、秘密を含まない再現手順、GitHub / X への連絡導線

ゲーム宣伝や監視ダッシュボードはこのリポの範囲外です。

## 技術方針

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js (App Router) |
| 出力 | `output: 'export'`（静的 `out/`） |
| 画像 | `images.unoptimized: true` |
| 言語 | TypeScript + シンプルな CSS（外部 CDN に依存しない） |
| パッケージ | npm（lockfile あり） |
| コンテナ | multi-stage: `next build` → `nginx:alpine` で `out/` 配信 |

`.github/workflows/**` と `k8s/**` の詳細デプロイは後続。ここではローカルビルドと静的配信の見せ方まで。

## ローカルビルド

要件: **Node.js 20+**

```bash
npm install
npm run build
# 成果物: out/
```

開発サーバ（任意）:

```bash
npm run dev
```

## Docker

```bash
docker build -t tagomori-homepage .
docker run --rm -p 8080:80 tagomori-homepage
```

秘密・`.env`・トンネル資格情報はイメージに含めません。

## ライセンス

リポジトリルートの `LICENSE` を参照。
