import ChainFlow from "@/components/ChainFlow";
import PhysicalChainSummary from "@/components/PhysicalChainSummary";

/** 構成図: A 公開サイトの論理パス / B デプロイ・パイプライン / C 物理ネットワーク */
export default function Architecture() {
  return (
    <div className="arch">
      <section className="subsheet" aria-labelledby="arch-a">
        <h3 id="arch-a" className="subsheet-title">
          <span className="subsheet-key mono" aria-hidden="true">
            A
          </span>
          公開サイト — 論理パス
        </h3>
        <ChainFlow
          ariaLabel="公開サイトの経路（訪問者から k3s ノードまで）"
          hops={[
            { title: "訪問者", sub: "Browser", zone: "INTERNET" },
            { title: "Cloudflare", sub: "Edge / Tunnel", zone: "PUBLIC EDGE", accent: true },
            { title: "cloudflared", sub: "Pod · homepage ns", zone: "HOMELAB" },
            { title: "homepage-web", sub: "nginx:alpine", zone: "HOMELAB" },
            { title: "k3s node", sub: "Ryzen 5700G", zone: "HOMELAB" },
          ]}
          links={[
            { label: "HTTPS" },
            { label: "Tunnel", boundary: "INBOUND 0" },
            { label: "Service" },
            { label: "on", relation: true },
          ]}
          zones={[
            { label: "Internet", span: [1, 1] },
            { label: "Public edge", span: [2, 2], tone: "edge" },
            { label: "Homelab · k3s（非公開）", span: [3, 5], tone: "private" },
          ]}
          caption="インバウンドポートは開けない。cloudflared がアウトバウンドで Tunnel を張り、Service 経由で nginx の静的ファイルを返す構成。"
        />
      </section>

      <section className="subsheet" aria-labelledby="arch-b">
        <h3 id="arch-b" className="subsheet-title">
          <span className="subsheet-key mono" aria-hidden="true">
            B
          </span>
          デプロイ — CI/CD パイプライン
        </h3>
        <ChainFlow
          ariaLabel="デプロイの工程（push から k3s への反映まで）"
          hops={[
            { title: "git push", sub: "main · paths filter", zone: "GITHUB" },
            { title: "Build", sub: "npm ci → next build", zone: "GITHUB" },
            { title: "GHCR", sub: "docker push :<sha>", zone: "GITHUB" },
            { title: "Tailscale", sub: "ephemeral · MagicDNS", zone: "GITHUB" },
            { title: "k3s", sub: "set image → rollout", zone: "HOMELAB", accent: true },
          ]}
          links={[{}, {}, {}, { label: "tailnet", boundary: "PRIVATE" }]}
          zones={[
            { label: "GitHub（hosted runner）", span: [1, 4] },
            { label: "Homelab（非公開）", span: [5, 5], tone: "private" },
          ]}
          caption="イメージは commit SHA でタグ付けし、rollout status で反映を確認する。秘密は GitHub Secrets だけに置き、リポジトリやイメージには含めない。"
        />
      </section>

      <section className="subsheet" aria-labelledby="arch-c">
        <h3 id="arch-c" className="subsheet-title">
          <span className="subsheet-key mono" aria-hidden="true">
            C
          </span>
          物理ネットワーク — 要約
        </h3>
        <PhysicalChainSummary />
      </section>
    </div>
  );
}
