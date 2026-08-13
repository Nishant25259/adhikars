import React from 'react';

function Seal() {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 15 * Math.PI) / 180;
    const x2 = 50 + 37 * Math.cos(angle);
    const y2 = 50 + 37 * Math.sin(angle);
    return <line key={i} x1="50" y1="50" x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />;
  });

  return (
    <svg viewBox="0 0 100 100" width="42" height="42" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
      {spokes}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  );
}

export default function Header({ registryNo }) {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <div className="brand">
          <div className="seal">
            <Seal />
          </div>
          <div className="brand-text">
            <div className="brand-name">
              Adhikars <span className="dev">अधिकार</span>
            </div>
            <div className="brand-tag">Know your rights. Register your voice.</div>
          </div>
        </div>

        {registryNo && (
          <div className="registry-pill">
            Registry No. <b>{registryNo}</b>
          </div>
        )}
      </div>
    </header>
  );
}
