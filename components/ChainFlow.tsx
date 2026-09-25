import type { CSSProperties, ReactNode } from "react";

export type Hop = {
  title: string;
  sub?: string;
  /** モバイル表示で各ノードに添える区画名（デスクトップでは下の寸法線で表す） */
  zone?: string;
  accent?: boolean;
};

export type HopLink = {
  label?: string;
  /** 通信ではなく「上で動く」等の関係を表す（破線） */
  relation?: boolean;
  /** この区間に境界（非公開側との境目）を引き、ラベルを添える */
  boundary?: string;
};

export type Zone = {
  label: string;
  /** 1 始まりのノード番号 [from, to] */
  span: [number, number];
  tone?: "edge" | "private" | "neutral";
};

type Props = {
  hops: Hop[];
  links?: HopLink[];
  zones?: Zone[];
  ariaLabel: string;
  caption?: ReactNode;
};

/**
 * 経路図（ノードと矢印の一列）。HTML + CSS で描くので、
 * デスクトップでは横一列 + 区画の寸法線、モバイルでは縦一列に自然に組み替わる。
 */
export default function ChainFlow({ hops, links = [], zones = [], ariaLabel, caption }: Props) {
  const style = { "--n": hops.length } as CSSProperties;

  return (
    <figure className="flow" style={style}>
      <ol className="flow-hops" aria-label={ariaLabel}>
        {hops.map((hop, i) => {
          const link = links[i];
          const last = i === hops.length - 1;
          const linkClass = [
            "hop-link",
            link?.relation ? "is-relation" : "",
            link?.boundary ? "is-boundary" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={hop.title} className={hop.accent ? "hop is-accent" : "hop"}>
              {hop.zone ? <span className="hop-zone mono">{hop.zone}</span> : null}
              <span className="hop-title">{hop.title}</span>
              {hop.sub ? <span className="hop-sub mono">{hop.sub}</span> : null}
              {!last ? (
                <span className={linkClass}>
                  {link?.label ? <span className="hop-link-label mono">{link.label}</span> : null}
                  {link?.boundary ? (
                    <span className="hop-boundary mono">{link.boundary}</span>
                  ) : null}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {zones.length > 0 ? (
        <div className="flow-zones" aria-hidden="true">
          {zones.map((z) => (
            <span
              key={z.label}
              className={`zone zone-${z.tone ?? "neutral"}`}
              style={{ gridColumn: `${z.span[0]} / ${z.span[1] + 1}` }}
            >
              <span className="zone-label">{z.label}</span>
            </span>
          ))}
        </div>
      ) : null}

      {/* 印刷時は図の代わりに 1 行の経路表記を出す */}
      <p className="flow-print print-only">
        {hops.map((h) => (h.sub ? `${h.title}（${h.sub}）` : h.title)).join(" → ")}
      </p>

      {caption ? <figcaption className="flow-caption">{caption}</figcaption> : null}
    </figure>
  );
}
