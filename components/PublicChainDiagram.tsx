/** 公開サイト配信鎖の SVG 図（色は CSS 変数 / currentColor を使いテーマに追従） */
const NODES = [
  { label: "訪問者", sub: "HTTPS", x: 0 },
  { label: "Cloudflare", sub: "Edge / Tunnel", x: 1, hot: true },
  { label: "cloudflared", sub: "Pod (homepage ns)", x: 2 },
  { label: "homepage-web", sub: "nginx:alpine", x: 3 },
  { label: "k3s node", sub: "Ryzen 5700G", x: 4 },
];

const W = 760;
const H = 180;
const BOX_W = 128;
const BOX_H = 56;
const GAP = (W - BOX_W * NODES.length) / (NODES.length - 1);

export default function PublicChainDiagram() {
  return (
    <figure className="diagram">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="公開サイト鎖: 訪問者 → Cloudflare Tunnel → cloudflared → homepage-web → k3s ノード"
      >
        <defs>
          <marker id="pc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
          </marker>
          <linearGradient id="pc-line" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>

        {/* 境界ラベル */}
        <g className="diagram-zone">
          <rect x={BOX_W + GAP / 2} y="18" width={BOX_W * 1 + GAP} height={H - 36} rx="10" />
          <text x={BOX_W + GAP / 2 + 10} y="36">public edge</text>
          <rect x={BOX_W * 2 + GAP * 2 - GAP / 2} y="18" width={BOX_W * 3 + GAP * 2 + GAP / 2 - 4} height={H - 36} rx="10" />
          <text x={BOX_W * 2 + GAP * 2 - GAP / 2 + 10} y="36">homelab (k3s, private)</text>
        </g>

        {NODES.map((n, i) => {
          const x = i * (BOX_W + GAP);
          const y = (H - BOX_H) / 2;
          return (
            <g key={n.label}>
              {i < NODES.length - 1 && (
                <line
                  x1={x + BOX_W}
                  y1={y + BOX_H / 2}
                  x2={x + BOX_W + GAP - 2}
                  y2={y + BOX_H / 2}
                  stroke="url(#pc-line)"
                  strokeWidth="2"
                  markerEnd="url(#pc-arrow)"
                />
              )}
              <rect
                x={x}
                y={y}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                className={n.hot ? "diagram-box hot" : "diagram-box"}
              />
              <text x={x + BOX_W / 2} y={y + 24} textAnchor="middle" className="diagram-label">
                {n.label}
              </text>
              <text x={x + BOX_W / 2} y={y + 42} textAnchor="middle" className="diagram-sub">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="diagram-caption">
        インバウンドポートは開けない。cloudflared がアウトバウンドで Tunnel を張り、Service 経由で nginx の静的ファイルを返す。
      </figcaption>
    </figure>
  );
}
