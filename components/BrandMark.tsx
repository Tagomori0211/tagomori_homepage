/**
 * ブランドマーク: 「田」の字 = 方眼（グリッド）= ラック。右下の区画だけ信号色で塗る。
 * favicon（app/icon.svg）と同じ形。色は currentColor と CSS 変数でテーマに追従する。
 */
export default function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" />
      <rect className="brand-mark-dot" x="14.5" y="14.5" width="5" height="5" />
    </svg>
  );
}
