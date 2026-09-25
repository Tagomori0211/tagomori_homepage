import BrandMark from "@/components/BrandMark";
import { GITHUB_URL, X_HANDLE } from "@/data/repos";
import { PROFILE, buildRevision } from "@/data/site";

/** フッター = 図面の表題欄。REV はビルド時点の年月（JST） */
export default function SiteFooter() {
  const rev = buildRevision();
  const year = rev.slice(0, 4);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-block">
          <div className="footer-cell footer-id">
            <BrandMark size={30} />
            <div>
              <p className="footer-name">{PROFILE.name}</p>
              <p className="footer-en mono">{PROFILE.nameEn.toUpperCase()}</p>
            </div>
          </div>
          <div className="footer-cell">
            <p className="footer-label mono">ROLE</p>
            <p className="footer-value">
              {PROFILE.role} 志望 · {PROFILE.city}
            </p>
          </div>
          <div className="footer-cell">
            <p className="footer-label mono">SERVED BY</p>
            <p className="footer-value mono">next export → nginx:alpine → k3s → Cloudflare Tunnel</p>
          </div>
          <div className="footer-cell">
            <p className="footer-label mono">REV</p>
            <p className="footer-value mono">{rev}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <ul className="footer-links">
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={`https://x.com/${X_HANDLE}`} target="_blank" rel="noopener noreferrer">
                X (@{X_HANDLE})
              </a>
            </li>
            <li>
              <a href={`${GITHUB_URL}/tagomori_homepage`} target="_blank" rel="noopener noreferrer">
                このサイトのソース
              </a>
            </li>
          </ul>
          <p className="footer-copy mono">
            © {year} {PROFILE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
