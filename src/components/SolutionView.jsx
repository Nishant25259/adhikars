import React, { useMemo, useState } from 'react';

export default function SolutionView({ profile = {}, scenario = {} }) {
  const [showDraft, setShowDraft] = useState(false);

  const appliedLaw = scenario?.law || 'Applicable statutes not available.';
  const summary = scenario?.summary || 'No summary available.';
  const dos = scenario?.dos || [];
  const donts = scenario?.donts || [];

  const specialProtections = useMemo(() => {
    const list = [];
    if (profile?.disability) list.push(scenario?.disabilityRights || 'Disability protections apply.');
    if ((profile?.caste || '').toLowerCase() === 'sc/st' || (profile?.caste || '').toLowerCase() === 'sc' || (profile?.caste || '').toLowerCase() === 'st') {
      list.push(scenario?.casteProtections || 'SC/ST protections apply.');
    }
    return list;
  }, [profile, scenario]);

  const draft = (scenario?.draftTemplate || '')
    .replace('[Name]', profile?.name || '[Your name]')
    .replace('[Address]', profile?.address || '[Your address]')
    .replace('[date]', new Date().toLocaleDateString());

  function copy(text) {
    try {
      navigator.clipboard?.writeText(text || draft);
      // silent success
    } catch (e) {
      // fail silently
    }
  }

  return (
    <div style={{marginTop: 16, padding: 12, borderRadius: 10, background: '#071029', color: '#e6f3ff'}}>
      <h3 style={{marginTop: 0}}>KYR Protection Card</h3>
      <div style={{padding: 10, borderRadius: 8, background: '#021124'}}>
        <strong>Applicable Statute:</strong>
        <div style={{marginTop: 6}}>{appliedLaw}</div>
        <div style={{marginTop: 8, color: '#c7f9d2'}}><strong>Summary:</strong> {summary}</div>
      </div>

      {specialProtections.length > 0 && (
        <div style={{marginTop: 12, padding: 10, borderRadius: 8, background: '#042f2d'}}>
          <strong>Special Protections Triggered</strong>
          <ul style={{marginTop: 8}}>
            {specialProtections.map((s, i) => (
              <li key={i} style={{color: '#fef3c7'}}>• {s}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12}}>
        <div style={{padding: 10, borderRadius: 8, background: '#021124'}}>
          <strong>What You Should Do</strong>
          <ul style={{marginTop: 8}}>
            {dos.map((d, i) => (
              <li key={i} style={{color: '#bbf7d0'}}>✅ {d}</li>
            ))}
          </ul>
        </div>

        <div style={{padding: 10, borderRadius: 8, background: '#021124'}}>
          <strong>What You Do NOT Need to Worry About</strong>
          <ul style={{marginTop: 8}}>
            {donts.map((d, i) => (
              <li key={i} style={{color: '#fecaca'}}>✖ {d}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{marginTop: 12}}>
        <strong>Helpline:</strong>
        <div style={{color: '#fecaca'}}>{scenario?.helpline || 'No helpline available.'}</div>
      </div>

      <div style={{marginTop: 12}}>
        <button onClick={() => setShowDraft((s) => !s)} style={{padding: 10, borderRadius: 8, background: '#f97316', color: '#fff'}}>
          {showDraft ? 'Hide Auto-Draft Official Grievance' : 'Auto-Draft Official Grievance'}
        </button>
      </div>

      {showDraft && (
        <div style={{marginTop: 12}}>
          <pre style={{whiteSpace: 'pre-wrap', padding: 12, borderRadius: 8, background: '#001018'}}>{draft}</pre>
          <div style={{marginTop: 8}}>
            <button onClick={() => copy(draft)} style={{padding: 10, borderRadius: 8, background: '#0ea5a1', color: '#042f2d'}}>Copy Draft</button>
          </div>
        </div>
      )}
    </div>
  );
}
