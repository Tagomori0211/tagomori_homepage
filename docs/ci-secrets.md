# CI / クラスタ Secret 置き方（値は書かない）

契約: `namespace=homepage` / Service `homepage-web:80`  
Tunnel 向き先: `http://homepage-web.homepage.svc.cluster.local:80`

本ファイルは**名前と置き場所**のみ。トークン・kubeconfig・パスフレーズ等の実値は禁止。

---

## 1. クラスタ側 Secret（Tunnel トークン）

| 名前 | namespace | key | 用途 |
|------|-----------|-----|------|
| `cloudflare-tunnel-secret` | `homepage` | `tunnel-token` | `cloudflared` Deployment が `secretKeyRef` で参照 |

作成例（ローカル端末。値はシェル履歴に残さないよう注意）:

```bash
kubectl -n homepage create secret generic cloudflare-tunnel-secret \
  --from-literal=tunnel-token=REPLACE_WITH_CF_TUNNEL_TOKEN \
  --dry-run=client -o yaml | kubectl apply -f -
```

- 実 Secret マニフェストを git にコミットしない。
- ConfigMap に Token を入れない。
- CF Zero Trust で Public Hostname を上記 Service DNS に向ける（ダッシュボード操作。本リポ外）。

---

## 2. GitHub Secrets（想定名・置き場所）

GitHub-hosted Actions で apply する場合の想定。**採否は裁可待ち。勝手に API を公開しない。**

| Secret 名（想定） | 置き場所 | 用途 |
|-------------------|----------|------|
| `KUBE_CONFIG` | リポ Settings → Secrets and variables → Actions | kubeconfig（クラスタ到達用）。値はここに書かない |
| `KUBE_CONTEXT`（任意） | 同上 | 複数 context がある場合の指定 |
| GHCR 関連（任意） | 同上 | 静的サイトをコンテナ化し GHCR に載せる場合のみ。イメージ方式を採らないなら不要 |

現時点で必須確定ではない。CI ワークフロー裁可後に名前を固定する。

---

## 3. GitHub-hosted runner → 私設 k3s API 到達（選択肢・事実）

code → k3s ノード（LAN 内アドレス）の SSH は鍵拒否で不通（既知）。**手動 kubectl from code はブロッカー。**  
GitHub-hosted のみで apply する場合、runner はクラスタ内網にいない。到達手段の選択肢（実装・公開は裁可後）:

1. **Tailscale 付き self-hosted / 一時 runner**（または Actions から Tailscale 接続）で API に届ける  
2. **kubeconfig が指す API エンドポイントを、既に到達可能な経路に限定**（既存の安全な入口がある場合のみ。新規の API 公開はしない）  
3. **踏み台経由の限定 apply**（IAP / 既存管理プレーン）。ホームページ専用に API をインターネットへ晒すのは非推奨  

どれを採るかは**経路裁可待ち**。勝手に API 公開・鍵配布をしない。

---

## 4. 関連マニフェスト

| ファイル | 役割 | 備考 |
|----------|------|------|
| `k8s/homepage/cloudflared-deployment.yaml` | Tunnel Deployment（Secret 参照のみ） | 本兵担当 |
| `k8s/homepage/web-deployment.yaml` / `web-service.yaml` / `namespace.yaml` | Web 本体 | 他兵担当。触らない |
| `.github/workflows/*` | CI apply | 経路裁可後。触らない |
