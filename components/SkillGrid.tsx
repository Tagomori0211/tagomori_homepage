import { skillCategories, certifications } from "@/data/skills";

export default function SkillGrid() {
  return (
    <div className="skill-section">
      <div className="skill-grid">
        {skillCategories.map((cat) => (
          <div key={cat.name} className="skill-category">
            <h4 className="skill-cat-name mono">{cat.name}</h4>
            <ul className="skill-list">
              {cat.skills.map((s) => (
                <li key={s} className="skill-tag mono">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {certifications.length > 0 && (
        <div className="cert-block">
          <h4 className="sub-heading mono">certifications</h4>
          <div className="cert-list">
            {certifications.map((c) => (
              <div key={c.name} className="cert-card">
                <span className="cert-issuer mono">{c.issuer}</span>
                <span className="cert-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
