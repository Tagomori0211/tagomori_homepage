# Homepage デプロイ設計案: IAP 経由（3番）

値・トークン・kubeconfig 本文・鍵・実 IP アドレスは書かない。名前と置き場所・手順案のみ。  
実装（`.github` 改修・Secret 投入・apply）は**裁可後**。本ファイルは設計偵察の成果物。

裁可前提:
- 到達は **IAP 経由（3番）**
- 禁止: メインマシン self-hosted / Tailscale を GH-hosted に載せる / k3s API 新規公開

契約: `namespace=homepage` / Service `homepage-web:80`

---

## 1. 正本（sushiMCfront）の事実

リポ: `sushiMCfront`（Status Platform / cloud-observability-gateway 相当）  
ワークフロー: `.github/workflows/deploy.yml`

| 項目 | 事実 |
|------|------|
| 接続 | `gcloud compute scp/ssh --tunnel-through-iap` |
| 届く先 | GCE VM **`tagomori-app`**（APP-instance） |
| 何を載せるか | ビルド成果物 tar → VM 上で **`docker compose up -d --build`**（cloudflared / Envoy / Ktor 等） |
| kubectl / オンプレ k3s | **使わない**（この CI は GCE 上 Compose のみ） |
| 認証 | GitHub Actions → **Workload Identity Federation** → `tagomori-ci-sa` |
| runner | 現行は `runs-on: self-hosted`（IAP 自体は self-hosted 必須ではない。GH-hosted + WIF でも IAP は可能） |
| 公開ポート | IAP SSH のみ。22/80/443 の対外公開不要 |

関連 Secret 名（sushiMCfront 側・置き場所は当該リポの Actions Secrets）:  
`GCP_WIF_PROVIDER` / `GCP_SERVICE_ACCOUNT` / `GCP_PROJECT_ID` / `GCE_ZONE` / `GCE_SSH_USER`（ほかアプリ固有は homepage 非必須）

---

## 2. tagomori-app → オンプレ k3s は届くか

### 届く（事実）

- **IAP → `tagomori-app`**: sushiMCfront CI で実績あり。
- **`tagomori-app` に Tailscale**: cloud-init / Ansible で導入。hostname `gce-tagomori-app`。auth key は Secret Manager `tailscale-auth-key`（既存共有）。

### 未実証・足りない（homepage の kubectl まで）

ドキュメント上、`tagomori-app` の Tailscale 目的は主に監視系（`gce-mc-monitoring` / VPC 内 VictoriaMetrics）。  
**「`tagomori-app` からオンプレ k3s API（例: Tailscale 上の k3s-worker）へ kubectl する」手順・実績は無し。**

オンプレ k3s API の既存ホスト（内向き・新規公開しない。実アドレスはリポに書かない）:
- LAN: `<k3s-worker の LAN アドレス>:6443`
- Tailscale: `<k3s-worker の tailnet アドレス>:6443`（MagicDNS 名 `k3s-worker` で参照）

正の運用（Minecraft-on-Kubenates）: **kubectl は `ssh k3s-worker` 上で `sudo kubectl`**。クライアント直実行は禁止。

### 結論（参謀上げ用）

| 区間 | 判定 |
|------|------|
| GH-hosted → IAP → `tagomori-app` | **届く**（既存パターン流用可） |
| `tagomori-app` → オンプレ k3s API / kubectl apply | **現状は届かない（未整備）** |

---

## 3. 最小手順案（設計のみ）

目標パス:

```text
GitHub-hosted (ubuntu-latest)
  → WIF で GCP 認証
  → gcloud compute scp/ssh --tunnel-through-iap → tagomori-app
  →（整備後）kubectl apply / set image（homepage ns）
```

推奨ロール分担:
1. **GH-hosted**: `npm` build → GHCR push（現行どおり。イメージはインターネット経由でクラスタが pull）
2. **IAP hop (`tagomori-app`)**: マニフェスト apply と `deployment/homepage-web` の image 更新のみ  
   （巨大成果物を IAP で流さない。イメージは GHCR）

### 足りない最小整備（実装するな・裁可待ち）

1. **`tagomori-app` に `kubectl` 導入**（未記載）
2. **オンプレ向け kubeconfig を VM 上に配置**（server は既存内向きホストのみ。git に実体を置かない。Secret Manager または手動一度きり）
3. **到達確認**: `gce-tagomori-app` → `k3s-worker`（tailnet 上の k3s API `:6443`）が Tailscale ACL / 経路で許可されているか実測
4. （代替案・同じく裁可）IAP → `tagomori-app` → **Tailscale SSH で `k3s-worker` に入り `sudo kubectl`**  
   - MoK 正手順に近いが、`tagomori-app`→`k3s-worker` の SSH 鍵整備が追加で必要（code→k3s は鍵拒否の既知事実あり。別経路）

禁止のまま: k3s API の新規インターネット公開 / GH-hosted に Tailscale / 陛下のマシンを self-hosted に使う

---

## 4. 必要な Secret / WIF（名前と置き場所だけ）

homepage リポ（`Tagomori0211/tagomori_homepage`）Settings → Secrets and variables → Actions:

| 名前 | 用途 |
|------|------|
| `GCP_WIF_PROVIDER` | WIF Provider リソース名（sushiMCfront と同系の既存を流用できるか裁可） |
| `GCP_SERVICE_ACCOUNT` | CI SA メール（例: tagomori-ci-sa 系。homepage apply 権限は別裁可） |
| `GCP_PROJECT_ID` | GCP プロジェクト ID |
| `GCE_ZONE` | 例: `asia-northeast1-b` |
| `GCE_SSH_USER` | OS Login ユーザー名 |
| （任意）`GCE_INSTANCE` | 固定なら workflow `env` で `tagomori-app` でも可 |

クラスタ側（git 外・VM または Secret Manager）:

| 名前 | 置き場所 | 用途 |
|------|----------|------|
| オンプレ kubeconfig（または同等） | `tagomori-app` 上の限定パス / Secret Manager | kubectl 向け。**リポにコミットしない** |
| `cloudflare-tunnel-secret` | クラスタ `homepage` ns | Tunnel Token（別作業。本 IAP 設計の外でも可） |

権限メモ（値なし）: CI SA に IAP トンネル利用と `tagomori-app` OS Login。クラスタ apply 用の認証情報は VM 側に閉じる（GH Secret にオンプレ kubeconfig 全文を置かない方針を推奨）。

現行 `KUBE_CONFIG`（GH Secret に全文）は **直 kubectl 用。IAP 案では廃止または使わない**。

---

## 5. 現行 `deploy-homepage.yml` からの差分案（編集はまだしない）

ファイル: `.github/workflows/deploy-homepage.yml`（他兵管理。**本兵は改修しない**）

| 現状 | IAP 案 |
|------|--------|
| `runs-on: ubuntu-latest` | **維持**（GH-hosted。禁止事項に抵触しない） |
| GHCR build/push | **維持** |
| `Setup kubectl` + Secret `KUBE_CONFIG` で runner 直 `kubectl apply` | **削除** |
| （なし） | `permissions.id-token: write` 追加 |
| （なし） | `google-github-actions/auth` + `setup-gcloud`（WIF） |
| （なし） | `gcloud compute scp` で `k8s/homepage/*.yaml`（または生成した apply 用 tarball）を IAP 経由で `tagomori-app` へ |
| （なし） | `gcloud compute ssh --tunnel-through-iap` 上で `kubectl apply` / `set image` / `rollout status` |
| Secret `KUBE_CONFIG` | **撤去予定**（IAP+VM 側認証に置換） |

依存: セクション 3 の最小整備が裁可・実装されるまで、workflow だけ先に変えても apply は失敗する。

---

## 6. 報告用一行まとめ

**IAP で `tagomori-app` までは届く。そこからオンプレ k3s への kubectl は未整備のため現状不可。kubectl・kubeconfig・Tailscale 到達の最小整備を裁可待ち。**
