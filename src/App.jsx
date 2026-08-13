import { useMemo, useState } from 'react';
import Header from './components/Header';
import PersonaSelector from './components/PersonaSelector';
import VoiceModule from './components/VoiceModule';
import RightsCard from './components/RightsCard';
import personaData from './data/kyrDatabase.json';

export default function App() {
  const personas = personaData.personas;
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);

  const currentPersona = useMemo(
    () => personas.find((persona) => persona.id === selectedPersona?.id) || personas[0],
    [personas, selectedPersona],
  );

  return (
    <div className="app-shell">
      <Header />

      <main className="main-grid">
        <div>
          <PersonaSelector
            personas={personas}
            selectedPersona={currentPersona}
            onSelect={setSelectedPersona}
          />
          <VoiceModule persona={currentPersona} />
        </div>

        <RightsCard persona={currentPersona} />
      </main>
    </div>
  );
}
