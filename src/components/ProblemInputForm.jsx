import React, { useState } from 'react';
import kyrData from '../data/kyrDatabase.json';

const QUICK = [
  'Wheelchair user denied FIR',
  'Cyber fraud — ₹20,000 deducted via UPI',
  'Defective phone, refund refused',
  'Recovery agent harassment at home',
];

// Categories are sourced directly from kyrDatabase.json ("categories" list),
// each mapped to a short id, glyph and description used by the rule engine.
const CATEGORY_META = {
  'Police & Custody': { id: 'police', glyph: '⚖', desc: 'Arrest, detention, FIR & custodial rights.' },
  'Consumer Laws': { id: 'consumer', glyph: '𝔅', desc: 'Refunds, defects & e-commerce disputes.' },
  'Labour Laws': { id: 'labour', glyph: '⚒', desc: 'Wages, termination & workplace conditions.' },
  'Cyber Laws': { id: 'cyber', glyph: '𝔊', desc: 'Fraud, phishing & online offences.' },
  'Fundamental Rights': { id: 'fundamental', glyph: '§', desc: 'Constitutional guarantees & remedies.' },
  'General Rights': { id: 'general', glyph: '𝔦', desc: 'RTI, rations & public service entitlements.' },
  'Tax Laws': { id: 'tax', glyph: '₹', desc: 'Income tax, GST & assessment notices.' },
};

const DOMAINS = (kyrData?.categories || []).map((name) => ({
  id: CATEGORY_META[name]?.id || name.toLowerCase().replace(/[^a-z]+/g, ''),
  glyph: CATEGORY_META[name]?.glyph || '§',
  label: name,
  desc: CATEGORY_META[name]?.desc || '',
}));

export default function ProblemInputForm({ onAnalyze }) {
  const [category, setCategory] = useState(DOMAINS[0]?.id || 'police');
  const [caste, setCaste] = useState('General');
  const [disability, setDisability] = useState(false);
  const [gender, setGender] = useState('General');
  const [text, setText] = useState('');

  function chooseQuick(q) {
    setText(q);
  }

  function dictate() {
    setText((prev) => (prev ? prev + ' ' : '') + 'I require immediate assistance.');
  }

  function submit(e) {
    e?.preventDefault?.();
    const profile = { caste, pwd: disability, gender };
    onAnalyze?.(text, category, profile);
  }

  return (
    <form className="dossier" onSubmit={submit}>
      <div className="section-block">
        <div className="section-head">
          <span className="idx">I.</span>
          <h2>Who you are</h2>
          <span className="rule" />
        </div>
        <p className="hint">These details help us surface protections specific to your situation.</p>
        <div className="id-card">
          <div className="field-group">
            <label className="label" htmlFor="caste">Category</label>
            <select id="caste" className="select" value={caste} onChange={(e) => setCaste(e.target.value)}>
              <option>General</option>
              <option>SC/ST</option>
              <option>OBC</option>
            </select>
          </div>

          <div className="field-group">
            <label className="label" htmlFor="disability">Disability</label>
            <select
              id="disability"
              className="select"
              value={disability ? 'PwD' : 'Non-Disabled'}
              onChange={(e) => setDisability(e.target.value === 'PwD')}
            >
              <option>Non-Disabled</option>
              <option>PwD</option>
            </select>
          </div>

          <div className="field-group">
            <label className="label" htmlFor="gender">Gender</label>
            <select id="gender" className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>General</option>
              <option>Woman</option>
              <option>Male</option>
            </select>
          </div>
        </div>
      </div>

      <div className="section-block">
        <div className="section-head">
          <span className="idx">II.</span>
          <h2>What kind of matter is this</h2>
          <span className="rule" />
        </div>
        <div className="domain-grid">
          {DOMAINS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`domain-tile ${category === d.id ? 'selected' : ''}`}
              onClick={() => setCategory(d.id)}
              aria-pressed={category === d.id}
            >
              <span className="glyph">{d.glyph}</span>
              <span className="d-label">{d.label}</span>
              <span className="d-desc">{d.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="section-block">
        <div className="section-head">
          <span className="idx">III.</span>
          <h2>Describe what happened</h2>
          <span className="rule" />
        </div>

        <div className="quick-row">
          {QUICK.map((q, i) => (
            <button key={i} type="button" className="chip" onClick={() => chooseQuick(q)}>
              {q}
            </button>
          ))}
        </div>

        <textarea
          className="affidavit"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Who, what, when, where — set down the facts plainly."
        />

        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={dictate}>
            🎙 Dictate
          </button>
          <button type="submit" className="seal-btn">
            File for Review
          </button>
        </div>
      </div>
    </form>
  );
}
