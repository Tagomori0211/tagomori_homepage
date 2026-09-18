import PublicChainDiagram from "@/components/PublicChainDiagram";
import PhysicalChainSummary from "@/components/PhysicalChainSummary";

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">
          自宅ラボを観測し、判断し、改善する記録
        </h1>
        <p className="tagline">
          Tagomori の公開ホームページ。homelab
          の配信鎖と物理構成の要約、そして blameless
          な運用の学びを静的サイトとして置いています。
        </p>
      </section>

      <section id="story" className="section" aria-labelledby="story-heading">
        <h2 id="story-heading">旗艦ストーリー</h2>
        <div className="story-flow" aria-label="改善サイクル">
          <span className="step">観測</span>
          <span className="arrow">→</span>
          <span className="step">判断</span>
          <span className="arrow">→</span>
          <span className="step">改善</span>
        </div>
        <div className="card">
          <p>
            あるワークロード向けに積み上げた構成が、運用コストをおよそ{" "}
            <strong>4.5 倍</strong>{" "}
            に押し上げていました。観測データと制約を並べ直し、「維持するより廃止する」と判断。
            余剰を削り、目的に合った薄い構成へ戻した結果、関連コストはおよそ{" "}
            <strong>75% 削減</strong>。人を責めない振り返り（blameless）で、次の判断基準を残しました。
          </p>
          <p className="note">
            ゲーム用途の宣伝ではなく、観測に基づくコストと複雑さの削減の話です。単スレッド性能が求められる実験負荷をきっかけに、物理ノード選定の制約が見えた、という位置づけに留めます。
          </p>
        </div>
        <div className="metrics">
          <div className="metric">
            <span className="value">×4.5</span>
            <span className="label">一時的なコスト膨張</span>
          </div>
          <div className="metric">
            <span className="value">−75%</span>
            <span className="label">廃止後の削減目安</span>
          </div>
          <div className="metric">
            <span className="value">blameless</span>
            <span className="label">振り返りの原則</span>
          </div>
        </div>
      </section>

      <section id="chains" className="section" aria-labelledby="chains-heading">
        <h2 id="chains-heading">
          二層の鎖 <span className="badge">公開 / 物理</span>
        </h2>

        <h3>a) 公開サイト鎖</h3>
        <p>
          訪問者がこのページに届くまでの論理パスです。秘密やトークンは載せず、公開可能な層だけを示します。
        </p>
        <ul className="chain-list">
          <li>
            <span className="node">訪問者</span>
            <span className="sep">→</span>
            <span className="node">Cloudflare Tunnel</span>
            <span className="sep">→</span>
            <span className="node">cloudflared</span>
            <span className="sep">→</span>
            <span className="node">Pod</span>
            <span className="sep">→</span>
            <span className="node">ノード</span>
          </li>
        </ul>
        <PublicChainDiagram />

        <h3>b) 物理鎖（要約）</h3>
        <PhysicalChainSummary />
      </section>

      <section id="ops" className="section" aria-labelledby="ops-heading">
        <h2 id="ops-heading">障害・運用（短文 / blameless）</h2>
        <div className="card">
          <p>
            障害は「誰が間違ったか」ではなく「どの前提が崩れたか」を見る。単一障害点が多いデイジーチェーンは、コスト優先で意図的に受容したリスクです。故障時は差し替えと下流の短時間影響を想定し、必要ならルーターと端末の Wi‑Fi
            直結でフェイルオーバーします。
          </p>
          <p>
            振り返りでは個人攻撃を避け、観測ログ・制約・判断の記録だけを残す。同じ失敗を繰り返さないための手順と、捨ててよい複雑さを文書化するのが目的です。
          </p>
        </div>
      </section>

      <section id="reproduce" className="section" aria-labelledby="reproduce-heading">
        <h2 id="reproduce-heading">秘密なし再現手順</h2>
        <div className="card">
          <p>
            このリポジトリは静的エクスポート（
            <code>output: &apos;export&apos;</code>
            ）です。秘密・証明書・トンネル資格情報は含めません。
          </p>
          <ol className="steps">
            <li>
              Node.js 20+ を用意する（推奨: nvm）
            </li>
            <li>
              <code>npm install</code>
            </li>
            <li>
              <code>npm run build</code> → <code>out/</code> に静的ファイルが生成される
            </li>
            <li>
              任意: <code>npx serve out</code> や Docker（下記）で配信を確認
            </li>
          </ol>
          <pre className="mono">{`# ローカル
npm install
npm run build

# コンテナ（マルチステージ: build → nginx:alpine）
docker build -t tagomori-homepage .
docker run --rm -p 8080:80 tagomori-homepage
# → http://localhost:8080/`}</pre>
          <p className="note">
            クラスタへのデプロイ手順（マニフェスト・CI）は後続で整備予定。本 README /
            サイトではローカルビルドと静的配信の方針までを示します。
          </p>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">連絡導線</h2>
        <div className="card">
          <p>メール実アドレスは公開しません。Issue / Discussion 経由でどうぞ。</p>
          <ul>
            <li>
              本サイトリポ:{" "}
              <a
                href="https://github.com/Tagomori0211/tagomori_homepage"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tagomori0211/tagomori_homepage
              </a>
            </li>
            <li>
              物理構成の正本:{" "}
              <a
                href="https://github.com/Tagomori0211/tagomori-homelab"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tagomori0211/tagomori-homelab
              </a>
            </li>
            <li>
              プロフィール:{" "}
              <a
                href="https://github.com/Tagomori0211"
                rel="noopener noreferrer"
                target="_blank"
              >
                github.com/Tagomori0211
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
