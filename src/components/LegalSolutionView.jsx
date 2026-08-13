import React, { useState } from 'react';

export default function LegalSolutionView({ analysis = {}, profile = {}, onReset, registryNo }) {
  const {
    applicableActs = [],
    legalRightsSummary = '',
    dos = [],
    donts = [],
    specialProtections = [],
    helplines = [],
    generatedDraft = '',
  } = analysis || {};

  const [toast, setToast] = useState('');

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(generatedDraft || '');
      setToast('Notice copied to clipboard');
    } catch (e) {
      setToast('Could not copy — select and copy manually');
    }
    setTimeout(() => setToast(''), 2500);
  }

  return (
    <div className="verdict">
      <div className="verdict-head">
        <div>
          <div className="k1">Case Assessment{registryNo ? ` · ${registryNo}` : ''}</div>
          <h2>Your rights &amp; recommended path</h2>
          <p className="subtitle">{legalRightsSummary}</p>
        </div>
        <button className="btn-ghost" onClick={onReset}>New Query</button>
      </div>

      <div className="acts">
        {applicableActs.map((a, i) => (
          <span key={i} className="act-pill">{a}</span>
        ))}
      </div>

      {specialProtections.length > 0 && (
        <div className="protection-card">
          <div className="protection-title">Special protections triggered for you</div>
          <ul>
            {specialProtections.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="ledger-2">
        <div className="ledger-col do">
          <h3>What to do</h3>
          <ol>
            {dos.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ol>
        </div>
        <div className="ledger-col dont">
          <h3>Know this too</h3>
          <ol>
            {donts.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="directory">
        <h3>Emergency &amp; helpline directory</h3>
        <div className="directory-list">
          {helplines.map((h, i) => (
            <div key={i} className="directory-line">{h}</div>
          ))}
        </div>
      </div>

      <div className="letter-block">
        <h3>Auto-drafted formal notice</h3>
        <pre className="letter-pre">{generatedDraft}</pre>
        <button className="seal-btn" onClick={copyDraft}>Copy Notice</button>
      </div>

      <div className="fineprint">
        THIS IS A GENERAL AWARENESS TOOL, NOT A SUBSTITUTE FOR FORMAL LEGAL ADVICE. FOR BINDING COUNSEL, CONSULT A
        LICENSED ADVOCATE OR YOUR NEAREST DISTRICT LEGAL SERVICES AUTHORITY.
      </div>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
