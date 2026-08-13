import React, { useState } from 'react';
import './index.css';
import Header from './components/Header';
import ProblemInputForm from './components/ProblemInputForm';
import LegalSolutionView from './components/LegalSolutionView';
import { analyzeLegalProblem } from './data/legalEngine';

function makeRegistryNo() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 8999);
  return `ADH-${year}-${num}`;
}

export default function App() {
  const [profile, setProfile] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [view, setView] = useState('input'); // input | loading | result
  const [registryNo] = useState(makeRegistryNo);

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
        setAnalysis({
          applicableActs: [],
          legalRightsSummary: '',
          dos: [],
          donts: [],
          specialProtections: [],
          helplines: [],
          generatedDraft: '',
        });
        setView('result');
      }
    }, 900);
  }

  function reset() {
    setView('input');
    setAnalysis(null);
    setProfile({});
  }

  return (
    <div className="app-viewport">
      <div className="noise-overlay" aria-hidden="true"></div>
      <div className="app-wrap">
        <Header registryNo={registryNo} />

        <main className="main">
          {view === 'input' && <ProblemInputForm onAnalyze={handleAnalyze} />}

          {view === 'loading' && (
            <div className="loading-card">
              <div className="stamp-spin" aria-hidden="true"></div>
              <div className="loading-heading">Reviewing your file…</div>
              <div className="loading-sub">Cross-referencing statutes and protections</div>
            </div>
          )}

          {view === 'result' && (
            <LegalSolutionView
              analysis={analysis || {}}
              profile={profile || {}}
              onReset={reset}
              registryNo={registryNo}
            />
          )}
        </main>

        <footer className="site-footer">
          <p>Every entry stays on your device. Adhikars is an independent awareness guide, not a government portal.</p>
        </footer>
      </div>
    </div>
  );
}
