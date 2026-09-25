import { CopyButton, PrintButton } from "@/components/ActionButtons";
import Architecture from "@/components/Architecture";
import CaseStudy from "@/components/CaseStudy";
import Hero from "@/components/Hero";
import { GitHubIcon, MailIcon } from "@/components/icons";
import RepoCard from "@/components/RepoCard";
import RepoTable from "@/components/RepoTable";
import SheetHead from "@/components/SheetHead";
import SkillGrid from "@/components/SkillGrid";
import Timeline from "@/components/Timeline";
import { GITHUB_URL, GITHUB_USER, X_HANDLE, repos } from "@/data/repos";
import { skillCategories } from "@/data/skills";
import { PROFILE, SITE_URL, sheet } from "@/data/site";

const PRINCIPLES = [
  {
    title: "「誰が」ではなく「どの前提が」崩れたか",
    body: "障害は人ではなく前提を疑う。観測ログ・制約・判断の記録だけを残し、個人攻撃は書かない。",
  },
  {
    title: "受容したリスクは明文化する",
    body: "デイジーチェーンは単一障害点が多い。コスト優先で意図的に受け入れたと書いておく。故障時は差し替えと下流の短時間影響を想定する。",
  },
  {
    title: "フェイルオーバーは最も単純な経路で",
    body: "必要ならルーターと端末の Wi‑Fi 直結に落とす。復旧の速さを、構成の美しさより優先する。",
  },
  {
    title: "捨ててよい複雑さを文書化する",
    body: "同じ失敗を繰り返さない手順と同じくらい、「もう要らないもの」のリストに価値がある。",
  },
];

const REPRODUCE_CMD = `# ローカル
npm install
npm run build          # → out/

# コンテナ（multi-stage: next build → nginx:alpine）
docker build -t tagomori-homepage .
docker run --rm -p 8080:80 tagomori-homepage
# → http://localhost:8080/

# クラスタ（CI が実行）
kubectl apply -f k8s/homepage/`;

/** 検索エンジン向けの構造化データ（ページに書いてある事実だけを載せる） */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  alternateName: PROFILE.nameEn,
  url: `${SITE_URL}/`,
  sameAs: [GITHUB_URL, `https://x.com/${X_HANDLE}`],
  address: {
    "@type": "PostalAddress",
    addressLocality: PROFILE.city,
    addressRegion: "福岡県",
    addressCountry: "JP",
  },
  knowsAbout: skillCategories.flatMap((c) => c.skills),
};

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <figure className="code">
      <figcaption className="code-head mono">
        <span>{label}</span>
        <span aria-hidden="true">sh</span>
      </figcaption>
      {/* 狭い画面では横スクロールになるため、キーボードでもスクロールできるよう tabIndex を付ける */}
      <pre className="mono" tabIndex={0} role="region" aria-label={`${label}（コマンド例）`}>
        {code.split("\n").map((line, i) => {
          const hash = line.indexOf("#");
          if (hash === -1) return <span key={i}>{line + "\n"}</span>;
          return (
            <span key={i}>
              {line.slice(0, hash)}
              <span className="code-comment">{line.slice(hash)}</span>
              {"\n"}
            </span>
          );
        })}
      </pre>
    </figure>
  );
}

export default function HomePage() {
  const featured = repos.filter((r) => r.featured);
  const rest = repos.filter((r) => !r.featured);

  return (
    <main id="main" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
      />

      <Hero />

      {/* ───────────── 01 自己紹介 ───────────── */}
      <section id="about" className="sheet" aria-labelledby="about-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("about")}
            headingId="about-heading"
            lead="現場で培った観察力と、独学で得たインフラ技術。"
          />
          <div className="profile reveal">
            <div className="prose">
              <p>
                専門学校（ゲームクリエータ科）を卒業後、ゲームデバッグや物流倉庫など多様な現場を経験してきました。2025
                年 11 月に独学を開始し、Terraform・Ansible・k3s を用いた小規模クラスタ環境の構築に到達しています。
              </p>
              <p>
                「自宅ラボ＝実務のシミュレーション環境」という方針のもと、FUJITSU PRIMERGY TX2540 M1、Ryzen 5700G
                マシン上に Proxmox VE を基盤としたクラスタ環境を構築・運用。IaC・監視・CI/CD
                の一連のパイプラインを個人で設計・構築・運用しています。
              </p>
              <p>
                現場で身につけた「数字を並べ、判断し、改善する」サイクルと独学で得たインフラ技術を武器に、Web /
                通信系のインフラエンジニア・SRE ポジションを志望しています。
              </p>
            </div>

            <aside className="tblock profile-card" aria-label="プロフィール">
              <div className="tblock-head mono">
                <span>PROFILE</span>
                <span>{PROFILE.nameEn}</span>
              </div>
              <dl className="tblock-rows">
                <div className="tblock-row">
                  <dt>氏名（HN）</dt>
                  <dd>
                    {PROFILE.name}（{PROFILE.reading}）
                  </dd>
                </div>
                <div className="tblock-row">
                  <dt>拠点</dt>
                  <dd>{PROFILE.location}</dd>
                </div>
                <div className="tblock-row">
                  <dt>志望</dt>
                  <dd>{PROFILE.role}</dd>
                </div>
                <div className="tblock-row">
                  <dt>学歴</dt>
                  <dd>
                    <span className="nowrap">工業高校</span> <span className="nowrap">電子情報科 卒</span>
                    <br />
                    <span className="nowrap">KCS北九州情報専門学校</span>{" "}
                    <span className="nowrap">ゲームクリエータ科 卒</span>
                  </dd>
                </div>
                <div className="tblock-row">
                  <dt>職歴</dt>
                  <dd>ゲームデバッグ、物流倉庫</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ───────────── 02 ケーススタディ ───────────── */}
      <section id="story" className="sheet" aria-labelledby="story-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("story")}
            headingId="story-heading"
            title="GKE を廃止し、関連コストを約 75% 削減"
            lead="Minecraft ワークロード向けに積み上げた構成が、月間の電気代・回線費を含む運用コストを予想のおよそ 4.5 倍に押し上げていた。観測データと制約を並べ直し、「維持するより廃止する」と判断した記録。"
          />
          <div className="reveal">
            <CaseStudy />
          </div>
        </div>
      </section>

      {/* ───────────── 03 構成図 ───────────── */}
      <section id="chains" className="sheet" aria-labelledby="chains-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("chains")}
            headingId="chains-heading"
            title="公開サイト・デプロイ・物理ネットワーク"
            lead="訪問者がこのページに届くまでの「公開サイト」、変更が本番に届くまでの「デプロイ」、パケットが実際に流れる「物理ネットワーク」。"
          />
          <div className="reveal">
            <Architecture />
          </div>
        </div>
      </section>

      {/* ───────────── 04 プロジェクト ───────────── */}
      <section id="projects" className="sheet" aria-labelledby="projects-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("projects")}
            headingId="projects-heading"
            lead="GitHub で公開しているリポジトリ。インフラ寄りのものを先頭に。"
          />
          <div className="reveal">
            <div className="featured">
              {featured.map((r, i) => (
                <RepoCard key={r.name} repo={r} index={i} />
              ))}
            </div>
            <RepoTable repos={rest} offset={featured.length} />
            <p className="sheet-cta">
              <a
                className="btn btn-ghost"
                href={`${GITHUB_URL}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub で全部見る <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── 05 技術スタック ───────────── */}
      <section id="skills" className="sheet" aria-labelledby="skills-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("skills")}
            headingId="skills-heading"
            lead="TAK Stack — Terraform (IaC) → Ansible (Config) → Kubernetes (Orchestration) を基軸に、監視・CI/CD を含むモダンな DevOps 環境を個人運用。"
          />
          <div className="reveal">
            <SkillGrid />
          </div>
        </div>
      </section>

      {/* ───────────── 06 学習の軌跡 ───────────── */}
      <section id="timeline" className="sheet" aria-labelledby="timeline-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("timeline")}
            headingId="timeline-heading"
            lead="2025 年 11 月の学習開始から、約 2 週間でクラスタ環境構築に到達。以降も継続的に技術領域を拡張。"
          />
          <div className="reveal">
            <Timeline />
          </div>
        </div>
      </section>

      {/* ───────────── 07 運用の原則 ───────────── */}
      <section id="ops" className="sheet" aria-labelledby="ops-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("ops")}
            headingId="ops-heading"
            title="障害・運用の原則"
            lead="短く、blameless に。"
          />
          <ol className="notes reveal">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="note">
                <span className="note-no mono" aria-hidden="true">
                  NOTE {i + 1}
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── 08 デプロイ手順 ───────────── */}
      <section id="reproduce" className="sheet" aria-labelledby="reproduce-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("reproduce")}
            headingId="reproduce-heading"
            title="当サイトのデプロイ手順"
            lead="このサイトは静的エクスポート。秘密・証明書・トンネル資格情報はリポジトリに含まれません。"
          />
          <div className="repro reveal">
            <ol className="proc">
              <li>
                <span>Node.js 20+ を用意する（推奨: nvm）</span>
              </li>
              <li>
                <span>
                  <code>npm install</code>
                </span>
              </li>
              <li>
                <span>
                  <code>npm run build</code> → <code>out/</code> に静的ファイルが生成される
                </span>
              </li>
              <li>
                <span>
                  <code>npx serve out</code> または Docker で配信を確認
                </span>
              </li>
              <li>
                <span>push すると GitHub Actions が GHCR にイメージを積み、Tailscale 経由で k3s に apply</span>
              </li>
            </ol>
            <CodeBlock code={REPRODUCE_CMD} label="REPRODUCE — shell" />
          </div>
        </div>
      </section>

      {/* ───────────── 09 連絡 ───────────── */}
      <section id="contact" className="sheet sheet-contact" aria-labelledby="contact-heading">
        <div className="container">
          <SheetHead
            sheet={sheet("contact")}
            headingId="contact-heading"
            lead="ご連絡はメールでお気軽にどうぞ。GitHub・X からでも構いません。"
          />
          <div className="contact reveal">
            <div className="mail-band crop">
              <div className="mail-main">
                <p className="channel-kind mono">
                  <MailIcon size={16} /> E-MAIL
                </p>
                <p className="mail-address">
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </p>
              </div>
              <div className="mail-actions">
                <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
                  メールを送る <span aria-hidden="true">→</span>
                </a>
                <CopyButton text={PROFILE.email} label="アドレスをコピー" />
              </div>
            </div>

            <ul className="channels">
              <li>
                <a className="channel" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <span className="channel-kind mono">
                    <GitHubIcon size={14} /> GITHUB
                  </span>
                  <span className="channel-value mono">{GITHUB_USER}</span>
                  <span className="channel-sub">公開リポジトリ</span>
                </a>
              </li>
              <li>
                <a
                  className="channel"
                  href={`https://x.com/${X_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="channel-kind mono">X</span>
                  <span className="channel-value mono">@{X_HANDLE}</span>
                  <span className="channel-sub">X（旧 Twitter）</span>
                </a>
              </li>
              <li>
                <a
                  className="channel"
                  href={`${GITHUB_URL}/tagomori_homepage/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="channel-kind mono">ISSUES</span>
                  <span className="channel-value">このサイトへの指摘</span>
                  <span className="channel-sub">誤り・改善点は Issue で</span>
                </a>
              </li>
            </ul>

            <p className="print-hint">
              <span>このページは印刷・PDF 保存用のレイアウトにも対応しています。</span>
              <PrintButton>印刷 / PDF で保存</PrintButton>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
