export default function PersonaSelector({ personas, selectedPersona, onSelect }) {
  return (
    <aside className="panel">
      <p className="section-label">Select a persona</p>
      <div className="persona-list">
        {personas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            className={`persona-button ${selectedPersona?.id === persona.id ? 'active' : ''}`}
            onClick={() => onSelect(persona)}
          >
            <div className="persona-icon">{persona.icon}</div>
            <strong>{persona.name}</strong>
            <span>{persona.tagline}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
