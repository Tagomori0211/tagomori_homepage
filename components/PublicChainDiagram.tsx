/** 公開サイト配信鎖の簡易 SVG 図 */
export default function PublicChainDiagram() {
  return (
    <div className="diagram" role="img" aria-label="公開サイト鎖の構成図">
      <svg
        viewBox="0 0 640 200"
        xmlns="http://www.w3.org/2000/svg"
        width="640"
        height="200"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#5b9fd4" />
          </marker>
        </defs>
        {/* boxes */}
        <rect x="8" y="70" width="100" height="48" rx="8" fill="#1e2a3a" stroke="#2d3a4d" />
        <text x="58" y="98" textAnchor="middle" fill="#e7ecf3" fontSize="13" fontFamily="system-ui,sans-serif">
          訪問者
        </text>

        <rect x="140" y="70" width="120" height="48" rx="8" fill="#1e2a3a" stroke="#5b9fd4" />
        <text x="200" y="90" textAnchor="middle" fill="#e7ecf3" fontSize="12" fontFamily="system-ui,sans-serif">
          Cloudflare
        </text>
        <text x="200" y="106" textAnchor="middle" fill="#9aabbd" fontSize="11" fontFamily="system-ui,sans-serif">
          Tunnel
        </text>

        <rect x="292" y="70" width="100" height="48" rx="8" fill="#1e2a3a" stroke="#2d3a4d" />
        <text x="342" y="98" textAnchor="middle" fill="#e7ecf3" fontSize="13" fontFamily="system-ui,sans-serif">
          cloudflared
        </text>

        <rect x="424" y="70" width="80" height="48" rx="8" fill="#1e2a3a" stroke="#2d3a4d" />
        <text x="464" y="98" textAnchor="middle" fill="#e7ecf3" fontSize="13" fontFamily="system-ui,sans-serif">
          Pod
        </text>

        <rect x="536" y="70" width="96" height="48" rx="8" fill="#1e2a3a" stroke="#2d3a4d" />
        <text x="584" y="98" textAnchor="middle" fill="#e7ecf3" fontSize="13" fontFamily="system-ui,sans-serif">
          ノード
        </text>

        {/* arrows */}
        <line x1="108" y1="94" x2="136" y2="94" stroke="#5b9fd4" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="260" y1="94" x2="288" y2="94" stroke="#5b9fd4" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="392" y1="94" x2="420" y2="94" stroke="#5b9fd4" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="504" y1="94" x2="532" y2="94" stroke="#5b9fd4" strokeWidth="2" markerEnd="url(#arrow)" />

        <text x="320" y="40" textAnchor="middle" fill="#9aabbd" fontSize="12" fontFamily="system-ui,sans-serif">
          公開サイト鎖（論理・配信パス）
        </text>
        <text x="320" y="170" textAnchor="middle" fill="#9aabbd" fontSize="11" fontFamily="system-ui,sans-serif">
          HTTPS → Tunnel → クラスタ内 Ingress/Service → 静的コンテンツ
        </text>
      </svg>
      <p className="diagram-caption">
        訪問者からノードまでの公開サイト配信鎖（簡略図）
      </p>
    </div>
  );
}
