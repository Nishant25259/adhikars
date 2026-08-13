import React, { useState } from 'react';

export default function LegalSolutionView({ analysis = {}, profile = {}, onReset }){
  const {
    applicableActs = [],
    legalRightsSummary = '',
    dos = [],
    donts = [],
    specialProtections = [],
    helplines = [],
    generatedDraft = ''
  } = analysis || {};

  const [toast, setToast] = useState('');

  async function copyDraft(){
    try{
      await navigator.clipboard.writeText(generatedDraft || '');
      setToast('Notice copied to clipboard');
      setTimeout(()=>setToast(''),2500);
    }catch(e){
      setToast('Copy failed');
      setTimeout(()=>setToast(''),2500);
    }
  }

  return (
    <div className="card solution-wrap">
      <div className="solution-header">
        <div>
          <div className="heading">Case Legal Assessment</div>
          <div className="subtitle">{legalRightsSummary}</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn-ghost" onClick={onReset}>New Query</button>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div className="acts">
          {applicableActs.map((a,i)=> <div key={i} className="act-pill" aria-hidden>{a}</div>)}
        </div>
      </div>

      {specialProtections.length > 0 && (
        <div className="card" style={{marginTop:12,borderLeft:'4px solid var(--gold)'}}>
          <div style={{fontWeight:800,color:'#14532d'}}>Special Demographic Protections Triggered</div>
          <div style={{marginTop:8}}>{specialProtections.join(', ')}</div>
        </div>
      )}

      <div className="grid-2" style={{marginTop:12}}>
        <div className="do-card">
          <div className="heading">Actionable Steps (Do's)</div>
          <ol>
            {dos.map((d,i)=> <li key={i}>{d}</li>)}
          </ol>
        </div>
        <div className="dont-card">
          <div className="heading">Legal Facts & Protections (Don'ts)</div>
          <ol>
            {donts.map((d,i)=> <li key={i}>{d}</li>)}
          </ol>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div className="heading">Emergency Helplines</div>
        <div className="helpline">
          {helplines.map((h,i)=> <div key={i} className="line">{h}</div>)}
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div className="heading">Auto-Drafted Formal Legal Notice / Grievance</div>
        <pre className="mono" style={{background:'#f1f5f9',color:'#0f172a'}}>{generatedDraft}</pre>
        <div style={{marginTop:8}}>
          <button className="btn-primary" onClick={copyDraft}>Copy Notice</button>
        </div>
      </div>

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
