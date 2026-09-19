import { milestones } from "@/data/timeline";

export default function Timeline() {
  return (
    <ol className="timeline" aria-label="学習・構築の軌跡">
      {milestones.map((m, i) => (
        <li
          key={i}
          className={`timeline-item${m.highlight ? " timeline-highlight" : ""}`}
        >
          <span className="timeline-marker" aria-hidden="true" />
          <span className="timeline-date mono">{m.date}</span>
          <div className="timeline-content">
            <h3>{m.title}</h3>
            <p>{m.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
