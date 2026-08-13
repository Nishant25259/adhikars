export default function VoiceModule({ persona }) {
  return (
    <div className="panel voice-panel">
      <p className="section-label">Voice & language</p>
      <div className="voice-box">
        <div className="voice-meta">
          <strong>{persona?.name || 'Worker'}</strong>
          <span>{persona?.language || 'Hindi + English'}</span>
        </div>
        <button type="button" className="voice-button">
          Play
        </button>
      </div>
    </div>
  );
}
