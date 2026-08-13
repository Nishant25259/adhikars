export default function RightsCard({ persona }) {
  if (!persona) return null;

  return (
    <div className="content-panel">
      <section className="hero-card">
        <h2>{persona.name}</h2>
        <p>{persona.summary}</p>
      </section>

      <section className="law-grid">
        {persona.rights.map((right) => (
          <article key={right.title} className="law-card">
            <span className="tag">{right.type}</span>
            <h3>{right.title}</h3>
            <p>{right.detail}</p>
            <strong>Remedy</strong>
            <p>{right.remedy}</p>
          </article>
        ))}
      </section>

      <section className="grievance-box">
        <h3>Grievance draft</h3>
        <pre>{persona.grievanceTemplate}</pre>
        <button type="button" className="generate-button">
          Generate grievance
        </button>
      </section>
    </div>
  );
}
