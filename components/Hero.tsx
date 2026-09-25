import { GITHUB_URL, GITHUB_USER } from "@/data/repos";
import { PROFILE } from "@/data/site";

const MOTTO = [
  { text: "観測し、", note: "01 OBSERVE" },
  { text: "判断し、", note: "02 DECIDE" },
  { text: "改善する。", note: "03 IMPROVE", accent: true },
];

/** 表題欄（右上の枠）: 何をする人か */
const TITLE_BLOCK: { k: string; v: string; note?: string }[] = [
  { k: "志望", v: "インフラエンジニア / SRE" },
  { k: "基軸", v: "Terraform → Ansible → k3s", note: "TAK STACK" },
  { k: "監視", v: "VictoriaMetrics・Grafana" },
  { k: "基盤", v: "Proxmox VE・10GbE 自宅ラボ" },
  { k: "学習開始", v: "2025.11" },
];

/** 表題欄の下段: このサイト自体の運用ルール */
const SPECS = [
  { k: "INBOUND PORTS", v: "0" },
  { k: "SECRETS IN REPO", v: "0" },
  { k: "POSTMORTEM", v: "BLAMELESS" },
];

/** 主要な数字。すべて根拠のシートへリンクする */
const FIGURES = [
  {
    value: "~2w",
    label: "未経験 → 小規模オンプレ k3s クラスタ構築",
    href: "#timeline",
    ref: "学習の軌跡",
    accent: true,
  },
  {
    value: "−75%",
    label: (
      <>
        インフラ関連コスト削減実績<span className="nowrap">（Minecraft-on-Kubernetes）</span>
      </>
    ),
    href: "#story",
    ref: "ケーススタディ",
    accent: true,
  },
  {
    value: "10GbE",
    label: "SPOF を受容した安価な LAN カードによるスイッチレス・デイジーチェーン",
    href: "#chains",
    ref: "構成図",
  },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-name">
                <span className="eyebrow-dot" aria-hidden="true" />
                {PROFILE.name}（HN）
              </span>
              <span className="eyebrow-meta">
                {PROFILE.role} 志望 · {PROFILE.city}
              </span>
            </p>

            <h1 id="hero-title" className="motto">
              {MOTTO.map((m) => (
                <span key={m.note} className={m.accent ? "motto-line is-accent" : "motto-line"}>
                  <span className="motto-text">{m.text}</span>
                  <span className="motto-leader" aria-hidden="true" />
                  <span className="motto-note mono" aria-hidden="true">
                    {m.note}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-lead">
              自宅ラボで FUJITSU PRIMERGY TX2540 M1 と自作 PC を運用しながら、IaC・監視・CI/CD
              を実践的に習得しました。Terraform・Ansible・Kubernetes を基軸に、
              <span className="nowrap-md">VictoriaMetrics・Grafana の監視基盤</span>を個人運用しています。
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#story">
                ケーススタディを読む
                <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn-ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                github.com/{GITHUB_USER}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="tblock title-block crop" aria-label="概要（表題欄）">
            <div className="tblock-head mono">
              <span>TITLE BLOCK</span>
              <span>tagomori.dev</span>
            </div>
            <dl className="tblock-rows">
              {TITLE_BLOCK.map((r) => (
                <div key={r.k} className="tblock-row">
                  <dt>{r.k}</dt>
                  <dd>
                    {r.v}
                    {r.note ? " " : null}
                    {r.note ? <span className="tblock-note mono">{r.note}</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
            <dl className="tblock-specs">
              {SPECS.map((s) => (
                <div key={s.k} className="tblock-spec">
                  <dt className="mono">{s.k}</dt>
                  <dd className="mono">{s.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <ul className="figures" aria-label="主要な数字">
          {FIGURES.map((f, i) => (
            <li key={f.value} className={f.accent ? "figure is-accent" : "figure"}>
              <span className="figure-idx mono" aria-hidden="true">
                FIG. {String.fromCharCode(65 + i)}
              </span>
              <span className="figure-value mono">{f.value}</span>
              <span className="figure-label">{f.label}</span>
              <a className="figure-ref mono" href={f.href}>
                根拠: {f.ref} <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
