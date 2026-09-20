import PublicChainDiagram from "@/components/PublicChainDiagram";
import PhysicalChainSummary from "@/components/PhysicalChainSummary";
import RepoCard from "@/components/RepoCard";
import SkillGrid from "@/components/SkillGrid";
import Timeline from "@/components/Timeline";
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
              田籠0211（HN） · インフラエンジニア志望 · 北九州市
            </p>
            <h1 id="hero-title">
              観測し、
              <br />
              判断し、
              <br />
              <span className="accent">改善する。</span>
            </h1>
            <p className="tagline">
              自宅ラボでFujitsu TX2540M1サーバー、<br/>
              自作PCを運用しながら、IaC・監視・CI/CD を実践的に習得しました。<br/>
              Terraform・Ansible・Kubernetes を基軸に、<br/>
              VictriaMetrics・Grafana 監視基盤を個人運用しています。
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#about">
                プロフィールを見る
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
            <span className="metric-value accent">~2w</span>
            <span className="metric-label">未経験 → 小規模オンプレ k3sクラスタ構築</span>
          </div>
          <div className="metric" role="listitem">
            <span className="metric-value accent">−75%</span>
            <span className="metric-label">インフラコスト削減実績(Minecraft-on-Kubernetes)</span>
          </div>
          <div className="metric" role="listitem">
            <span className="metric-value">10G Lan環境</span>
            <span className="metric-label">SPOFを受容した安価なLANカードを用いたスイッチレス・デイジーチェーン</span>
          </div>
        </div>
      </section>

      {/* ───────────── About ───────────── */}
      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <SectionHead
            no="01"
            id="about-heading"
            title="自己紹介"
            lead="現場で培った観察力と、独学で得たインフラ技術。"
          />
          <div className="about-grid">
            <div className="about-main">
              <p>
                専門学校（ゲームクリエータ科）を卒業後、<br/>
                ゲームデバッグや物流倉庫など多様な現場を経験してきました。<br/>
                2025 年 11 月に独学を開始し、<br/>
                Terraform・Ansible・k3s を用いた小規模クラスタ環境の構築に到達しています。<br/>
              </p>
              <p>
                「自宅ラボ＝実務のシミュレーション環境」という方針のもと、<br />
                FUJITSU PRIMERGY TX2540 M1、Ryzen5700Gマシン上に<br />
                Proxmox VE を基盤としたクラスター環境を構築・運用。<br />
                IaC・監視・CI/CD の一連のパイプラインを個人で設計・構築・運用しています。
              </p>
              
              <p>
                現場で身につけた「数字を並べ、判断し、改善する」サイクルと独学で得たインフラ技術を武器に、
                Web / 通信系のエンジニア・SRE ポジションを志望しています。
              </p>
            </div>
            <aside className="about-card">
              <dl className="profile-dl">
                <dt className="mono">氏名（HN）</dt>
                <dd>田籠0211（たごもり）</dd>
                <dt className="mono">拠点</dt>
                <dd>福岡県 北九州市</dd>
                <dt className="mono">志望</dt>
                <dd>インフラエンジニア / SRE</dd>
                <dt className="mono">学歴</dt>
                <dd>
                  工業高校 電子情報科 卒
                  <br />
                  KCS北九州情報専門学校 ゲームクリエータ科 卒
                </dd>
                <dt className="mono">職歴</dt>
                <dd>ゲームデバッグ、物流倉庫</dd>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ───────────── Skills ───────────── */}
      <section id="skills" className="section alt" aria-labelledby="skills-heading">
        <div className="container">
          <SectionHead
            no="02"
            id="skills-heading"
            title="技術スタック"
            lead="TAK Stack — Terraform (IaC) → Ansible (Config) → Kubernetes (Orchestration) を基軸に、監視・CI/CD を含むモダンな DevOps 環境を個人運用。"
          />
          <SkillGrid />
        </div>
      </section>

      {/* ───────────── Timeline ───────────── */}
      <section id="timeline" className="section" aria-labelledby="timeline-heading">
        <div className="container">
          <SectionHead
            no="03"
            id="timeline-heading"
            title="学習の軌跡"
            lead="2025 年 11 月の学習開始から、約 2 週間でクラスタ環境構築に到達。以降も継続的に技術領域を拡張。"
          />
          <Timeline />
        </div>
      </section>

      {/* ───────────── Story ───────────── */}
      <section id="story" className="section alt" aria-labelledby="story-heading">
        <div className="container">
          <SectionHead
            no="04"
            id="story-heading"
            title="メインストーリー"
            lead="Minecraftワークロード向けに積み上げた構成が、月間の電気代・回線費を含む運用コストを予想のおよそ 4.5 倍に押し上げていた。観測データと制約を並べ直し、「維持するより廃止する」と判断した記録。"
          />
          <ol className="steps-grid">
            <li className="step-card">
              <span className="step-no mono">01 / 観測</span>
              <h3>数字を並べる</h3>
              <p>
                月間の電気代・回線費・稼働率・実際に使われた時間を同じ表に置いた。
                VictoriaMetrics のデータとGCP課金データを突き合わせ、感覚ではなく
                「何に、いくら、どれだけ使ったか」を把握した。
              </p>
            </li>
            <li className="step-card">
              <span className="step-no mono">02 / 判断</span>
              <h3>維持より廃止</h3>
              <p>
                GKEを使用してマネージドサービスの恩恵を受けていたが、Minecraftプロキシには過剰であり、コストが高すぎた。そのためGCEでのDocker-Compose運用に切り替え、GKEを廃止する判断を下した。
              </p>
            </li>
            <li className="step-card">
              <span className="step-no mono">03 / 改善</span>
              <h3>−75% と基準の文書化</h3>
              <p>
                余剰を削り、月間の関連コストはおよそ 75% 減。Blameless な振り返りで
                「次に同じ判断を迫られたときの基準」を文書化し、再発防止策をリポジトリに残した。
              </p>
            </li>
          </ol>
          <p className="note">
            この判断プロセスは、規模に関わらず同じフレームワークが適用できると考えています。
            「観測→判断→改善」のサイクルを言語化し、チームで共有可能な基準に落とし込むことが重要です。
          </p>
        </div>
      </section>

      {/* ───────────── Chains ───────────── */}
      <section id="chains" className="section" aria-labelledby="chains-heading">
        <div className="container">
          <SectionHead
            no="05"
            id="chains-heading"
            title="公開サイトフローと物理ネットワーク"
            lead="訪問者がこのページに届くまでの「公開サイト」と、パケットが実際に流れる「物理ネットワーク」。"
          />

          <div className="chain-block">
            <h3>
              <span className="chip">a</span> 公開サイト — 論理パス
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
      <section id="projects" className="section alt" aria-labelledby="projects-heading">
        <div className="container">
          <SectionHead
            no="06"
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
      <section id="ops" className="section" aria-labelledby="ops-heading">
        <div className="container">
          <SectionHead
            no="07"
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
      <section id="reproduce" className="section alt" aria-labelledby="reproduce-heading">
        <div className="container reproduce-grid">
          <div>
            <SectionHead
              no="08"
              id="reproduce-heading"
              title="当サイトのデプロイ手順"
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
            no="09"
            id="contact-heading"
            title="連絡"
            //lead="メールアドレスは公開していません。GitHub の Issue / Discussion か X でどうぞ。"
          />
          <div className="contact-links">
            <a
              className="contact-card"
              //href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="contact-kind mono">E-Mail</span>
              <span className="contact-value">tagomoriyuukichi@gmail.com</span>
            </a>
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
