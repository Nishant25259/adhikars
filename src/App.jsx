import React, { useState } from 'react';
import './index.css';
import Header from './components/Header';
import ProblemInputForm from './components/ProblemInputForm';
import LegalSolutionView from './components/LegalSolutionView';
import { analyzeLegalProblem } from './data/legalEngine';

export default function App() {
  const [profile, setProfile] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [view, setView] = useState('input'); // input | loading | result

  async function handleAnalyze(problemText, category, p) {
    const profileObj = p || {};
    setProfile(profileObj || {});
    setView('loading');

    // small debounce to show progress
    setTimeout(() => {
      try {
        const result = analyzeLegalProblem(problemText || '', category || 'police', profileObj || {});
        setAnalysis(result || {});
        setView('result');
      } catch (e) {
        setAnalysis({ applicableActs: [], legalRightsSummary: '', dos: [], donts: [], specialProtections: [], helplines: [], generatedDraft: '' });
        setView('result');
      }
    }, 700);
  }

  return (
    <div className="app-viewport">
      <div className="app-wrap">
        <Header />

        <main style={{marginTop:12}}>
          {view === 'input' && (
            <div className="card">
              <ProblemInputForm onAnalyze={handleAnalyze} />
            </div>
          )}

          {view === 'loading' && (
            <div className="card loading">
              <div className="heading">Analyzing legal context…</div>
              <div className="progress"><i /></div>
              <div className="muted small">Cross-referencing statutes and protections</div>
            </div>
          )}

          {view === 'result' && (
            <LegalSolutionView
              analysis={analysis || {}}
              profile={profile || {}}
              onReset={() => { setView('input'); setAnalysis(null); setProfile({}); }}
            />
          )}
          {view === 'result' && (
            <div style={{display:'flex',justifyContent:'flex-end',marginTop:12,gap:8}}>
              <button className="btn-ghost" onClick={() => { setView('input'); setAnalysis(null); setProfile({}); }}>Reset & Draft New Notice</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

