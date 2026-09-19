import PublicChainDiagram from "@/components/PublicChainDiagram";
import PhysicalChainSummary from "@/components/PhysicalChainSummary";
import RepoCard from "@/components/RepoCard";
import { GITHUB_URL, GITHUB_USER, X_HANDLE, repos } from "@/data/repos";

function SectionHead({
  no,
  id,
  title,
  lead,
}: {
  no: string;
  id: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="section-head">
      <span className="section-no mono">§ {no}</span>
      <h2 id={id}>{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

export default function HomePage() {
  const featured = repos.filter((r) => r.featured);
  const rest = repos.filter((r) => !r.featured);

  return (
    <main>
      {/* ───────────── Hero ───────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow mono">
              田籠 / Tagomori · インフラエンジニア志望 · Kitakyushu
            </p>
            <h1 id="hero-title">
              観測し、
              <br />
              判断し、
              <br />
              <span className="accent">改善する。</span>
            </h1>
            <p className="tagline">
              自宅ラボ（homelab）を運用しながら、配信鎖・物理構成・障害対応を記録しています。
              コストを 4.5 倍に膨らませた構成を捨てて 75% 削るまでの判断と、
              その過程で公開したプロジェクトをまとめたページです。
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#projects">
                プロジェクトを見る
              </a>
              <a
                className="btn ghost"
                href={GITHUB_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                github.com/{GITHUB_USER} ↗
              </a>
            </div>
          </div>

          <div className="terminal" aria-label="このサイトの配信状態（イメージ）">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
              <span className="terminal-title mono">homepage — k3s</span>
            </div>
            <pre className="terminal-body mono">
              <span className="t-prompt">$</span> kubectl -n homepage get deploy{"\n"}
              <span className="t-dim">NAME               READY   AGE</span>{"\n"}
              homepage-web       <span className="t-ok">1/1</span>     stable{"\n"}
              cloudflare-tunnel  <span className="t-ok">1/1</span>     stable{"\n"}
              {"\n"}
              <span className="t-prompt">$</span> trace visitor → node{"\n"}
              <span className="t-accent">visitor</span> ─ https ─▶ <span className="t-accent">cloudflare</span> ─ tunnel ─▶{"\n"}
              <span className="t-accent">cloudflared</span> ─ svc ─▶ <span className="t-accent">nginx</span> ─▶ <span className="t-accent">ryzen-5700g</span>{"\n"}
              {"\n"}
              <span className="t-prompt">$</span> cat principles.txt{"\n"}
              <span className="t-dim"># inbound ports: 0</span>{"\n"}
              <span className="t-dim"># secrets in repo: 0</span>{"\n"}
              <span className="t-dim"># postmortems: blameless</span>
              <span className="t-cursor" aria-hidden="true" />
            </pre>
          </div>
        </div>

        <div className="container metrics" role="list" aria-label="主要な数字">
          <div className="metric" role="listitem">
            <span className="metric-value">×4.5</span>
            <span className="metric-label">一時的に膨らんだ運用コスト</span>
          </div>
          <div className="metric" role="listitem">
            <span className="metric-value accent">−75%</span>
            <span className="metric-label">廃止・薄型化後の削減</span>
          </div>
          <div className="metric" role="listitem">
            <span className="metric-value">10G</span>
            <span className="metric-label">スイッチレス・デイジーチェーン</span>
          </div>
          <div className="metric" role="listitem">
            <span className="metric-value">{repos.length}</span>
            <span className="metric-label">GitHub 公開リポジトリ</span>
          </div>
        </div>
      </section>

      {/* ───────────── Story ───────────── */}
      <section id="story" className="section" aria-labelledby="story-heading">
        <div className="container">
          <SectionHead
            no="01"
            id="story-heading"
            title="旗艦ストーリー"
            lead="あるワークロード向けに積み上げた構成が、運用コストをおよそ 4.5 倍に押し上げていた。観測データと制約を並べ直し、「維持するより廃止する」と判断した記録。"
          />
          <ol className="steps-grid">
            <li className="step-card">
              <span className="step-no mono">01 / 観測</span>
              <h3>数字を並べる</h3>
              <p>
                コスト・電力・稼働率・実際に使われた時間を同じ表に置く。感覚ではなく、
                「何に、いくら、どれだけ使ったか」を見える形にした。
              </p>
            </li>
            <li className="step-card">
              <span className="step-no mono">02 / 判断</span>
              <h3>維持より廃止</h3>
              <p>
                単スレッド性能が要る実験負荷のために組んだ構成は、目的を果たした後は過剰だった。
                サンクコストに引きずられず、薄い構成へ戻す判断を下した。
              </p>
            </li>
            <li className="step-card">
              <span className="step-no mono">03 / 改善</span>
              <h3>−75% と基準の文書化</h3>
              <p>
                余剰を削り、関連コストはおよそ 75% 減。blameless な振り返りで
                「次に同じ判断を迫られたときの基準」を残した。
              </p>
            </li>
          </ol>
          <p className="note">
            ゲーム用途の宣伝ではなく、観測に基づくコストと複雑さの削減の話です。物理ノード選定の制約が見えたきっかけ、という位置づけに留めます。
          </p>
        </div>
      </section>

      {/* ───────────── Chains ───────────── */}
      <section id="chains" className="section alt" aria-labelledby="chains-heading">
        <div className="container">
          <SectionHead
            no="02"
            id="chains-heading"
            title="二層の鎖"
            lead="訪問者がこのページに届くまでの「公開サイト鎖」と、パケットが実際に流れる「物理鎖」。秘密やトークンは載せず、公開可能な層だけを示します。"
          />

          <div className="chain-block">
            <h3>
              <span className="chip">a</span> 公開サイト鎖 — 論理・配信パス
            </h3>
            <PublicChainDiagram />
          </div>

          <div className="chain-block">
            <h3>
              <span className="chip">b</span> 物理鎖 — 要約
            </h3>
            <PhysicalChainSummary />
          </div>
        </div>
      </section>

      {/* ───────────── Projects ───────────── */}
      <section id="projects" className="section" aria-labelledby="projects-heading">
        <div className="container">
          <SectionHead
            no="03"
            id="projects-heading"
            title="プロジェクト"
            lead="GitHub で公開しているリポジトリ。インフラ寄りのものを先頭に。"
          />
          <h3 className="sub-heading mono">featured</h3>
          <div className="repo-grid featured-grid">
            {featured.map((r) => (
              <RepoCard key={r.name} repo={r} />
            ))}
          </div>
          <h3 className="sub-heading mono">all repositories</h3>
          <div className="repo-grid">
            {rest.map((r) => (
              <RepoCard key={r.name} repo={r} />
            ))}
          </div>
          <p className="section-cta">
            <a
              className="btn ghost"
              href={`${GITHUB_URL}?tab=repositories`}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub で全部見る ↗
            </a>
          </p>
        </div>
      </section>

      {/* ───────────── Ops ───────────── */}
      <section id="ops" className="section alt" aria-labelledby="ops-heading">
        <div className="container">
          <SectionHead
            no="04"
            id="ops-heading"
            title="障害・運用の原則"
            lead="短く、blameless に。"
          />
          <div className="principles">
            <article className="principle">
              <h3>「誰が」ではなく「どの前提が」崩れたか</h3>
              <p>
                障害は人ではなく前提を疑う。観測ログ・制約・判断の記録だけを残し、個人攻撃は書かない。
              </p>
            </article>
            <article className="principle">
              <h3>受容したリスクは明文化する</h3>
              <p>
                デイジーチェーンは単一障害点が多い。コスト優先で意図的に受け入れたと書いておく。
                故障時は差し替えと下流の短時間影響を想定する。
              </p>
            </article>
            <article className="principle">
              <h3>フェイルオーバーは最も単純な経路で</h3>
              <p>
                必要ならルーターと端末の Wi‑Fi 直結に落とす。復旧の速さを、構成の美しさより優先する。
              </p>
            </article>
            <article className="principle">
              <h3>捨ててよい複雑さを文書化する</h3>
              <p>
                同じ失敗を繰り返さない手順と同じくらい、「もう要らないもの」のリストに価値がある。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ───────────── Reproduce ───────────── */}
      <section id="reproduce" className="section" aria-labelledby="reproduce-heading">
        <div className="container reproduce-grid">
          <div>
            <SectionHead
              no="05"
              id="reproduce-heading"
              title="秘密なし再現手順"
              lead="このサイトは静的エクスポート。秘密・証明書・トンネル資格情報はリポに含まれません。"
            />
            <ol className="steps">
              <li>Node.js 20+ を用意する（推奨: nvm）</li>
              <li>
                <code>npm install</code>
              </li>
              <li>
                <code>npm run build</code> → <code>out/</code> に静的ファイルが生成される
              </li>
              <li>
                <code>npx serve out</code> または Docker で配信を確認
              </li>
              <li>
                push すると GitHub Actions が GHCR にイメージを積み、Tailscale 経由で k3s に apply
              </li>
            </ol>
          </div>
          <pre className="codeblock mono">{`# ローカル
npm install
npm run build          # → out/

# コンテナ（multi-stage: next build → nginx:alpine）
docker build -t tagomori-homepage .
docker run --rm -p 8080:80 tagomori-homepage
# → http://localhost:8080/

# クラスタ（CI が実行）
kubectl apply -f k8s/homepage/`}</pre>
        </div>
      </section>

      {/* ───────────── Contact ───────────── */}
      <section id="contact" className="section contact" aria-labelledby="contact-heading">
        <div className="container contact-inner">
          <SectionHead
            no="06"
            id="contact-heading"
            title="連絡"
            lead="メールアドレスは公開していません。GitHub の Issue / Discussion か X でどうぞ。"
          />
          <div className="contact-links">
            <a
              className="contact-card"
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="contact-kind mono">github</span>
              <span className="contact-value">{GITHUB_USER}</span>
            </a>
            <a
              className="contact-card"
              href={`https://x.com/${X_HANDLE}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="contact-kind mono">x</span>
              <span className="contact-value">@{X_HANDLE}</span>
            </a>
            <a
              className="contact-card"
              href={`${GITHUB_URL}/tagomori_homepage/issues`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="contact-kind mono">issues</span>
              <span className="contact-value">このサイトへの指摘</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
