import { certifications, skillCategories } from "@/data/skills";

const TAK = [
  { letter: "T", name: "Terraform", role: "IaC" },
  { letter: "A", name: "Ansible", role: "Config" },
  { letter: "K", name: "Kubernetes (k3s)", role: "Orchestration" },
];

/** 技術スタック: TAK Stack の流れ + カテゴリ別の仕様表 */
export default function SkillGrid() {
  return (
    <div className="skills">
      <ol className="tak" aria-label="TAK Stack（上流から順に）">
        {TAK.map((t) => (
          <li key={t.letter} className="tak-item">
            <span className="tak-letter mono" aria-hidden="true">
              {t.letter}
            </span>
            <span className="tak-name">{t.name}</span>
            <span className="tak-role mono">{t.role}</span>
          </li>
        ))}
      </ol>

      <dl className="spec">
        {skillCategories.map((cat) => (
          <div key={cat.name} className="spec-row">
            <dt>{cat.name}</dt>
            <dd>
              <ul className="chips">
                {cat.skills.map((s) => (
                  <li key={s} className="chip mono">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      {certifications.length > 0 ? (
        <div className="certs">
          <p className="certs-title mono">CERTIFICATIONS</p>
          <ul className="certs-list">
            {certifications.map((c) => (
              <li key={c.name} className="cert">
                <span className="cert-issuer mono">{c.issuer}</span>
                <span className="cert-name">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
