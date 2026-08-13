import React, { useMemo, useState } from 'react';
import { kyrData } from '../data/kyrDatabase';

export default function UserForm({ onSubmit }) {
  const categories = kyrData?.categories || [];

  const [categoryId, setCategoryId] = useState(categories?.[0]?.id || 'police');
  const [caste, setCaste] = useState('General');
  const [disability, setDisability] = useState(false);
  const [genderAge, setGenderAge] = useState('General Citizen');
  const [preset, setPreset] = useState('default');
  const [customQuery, setCustomQuery] = useState('');

  const presets = useMemo(() => {
    const map = {};
    Object.keys(kyrData?.scenarios || {}).forEach((key) => {
      map[key] = kyrData?.scenarios?.[key]?.summary || '';
    });
    return map;
  }, []);

  function handleSubmit(e) {
    e?.preventDefault?.();
    const selectedScenario = kyrData?.scenarios?.[categoryId] || {};
    const userQuery = preset === 'custom' ? customQuery : presets[categoryId] || '';

    const profile = {
      categoryId,
      caste,
      disability,
      genderAge,
      userQuery
    };

    onSubmit?.(profile, selectedScenario);
  }

  return (
    <form onSubmit={handleSubmit} style={{marginTop: 12, display: 'grid', gap: 12}}>
      <div>
        <div style={{marginBottom: 8, fontWeight: 700}}>Select Category</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8}}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryId(c.id)}
              style={{
                padding: 12,
                borderRadius: 10,
                border: categoryId === c.id ? '2px solid #60a5fa' : '1px solid #334155',
                background: categoryId === c.id ? '#0f172a' : '#071029',
                color: '#fff'
              }}
            >
              <div style={{fontSize: 18}}>{c.icon}</div>
              <div style={{fontSize: 13}}>{c.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{display: 'flex', gap: 8}}>
        <div style={{flex: 1}}>
          <label style={{display: 'block', marginBottom: 6}}>Caste / Category</label>
          <select value={caste} onChange={(e) => setCaste(e.target.value)} style={{width: '100%', padding: 8, borderRadius: 8}}>
            <option>General</option>
            <option>SC/ST</option>
            <option>OBC</option>
            <option>Minority</option>
          </select>
        </div>

        <div style={{width: 140}}>
          <label style={{display: 'block', marginBottom: 6}}>Disability</label>
          <div style={{display: 'flex', gap: 6}}>
            <button type="button" onClick={() => setDisability(false)} style={{flex: 1, padding: 8, borderRadius: 8, background: !disability ? '#064e3b' : '#0b1220', color: '#fff'}}>No</button>
            <button type="button" onClick={() => setDisability(true)} style={{flex: 1, padding: 8, borderRadius: 8, background: disability ? '#064e3b' : '#0b1220', color: '#fff'}}>Yes</button>
          </div>
        </div>
      </div>

      <div>
        <label style={{display: 'block', marginBottom: 6}}>Gender / Age</label>
        <select value={genderAge} onChange={(e) => setGenderAge(e.target.value)} style={{width: '100%', padding: 8, borderRadius: 8}}>
          <option>General Citizen</option>
          <option>Woman</option>
          <option>Senior Citizen</option>
        </select>
      </div>

      <div>
        <label style={{display: 'block', marginBottom: 6}}>Query Preset</label>
        <select value={preset} onChange={(e) => setPreset(e.target.value)} style={{width: '100%', padding: 8, borderRadius: 8}}>
          <option value="default">Use category summary</option>
          <option value="custom">Enter custom query</option>
        </select>
      </div>

      {preset === 'custom' ? (
        <div>
          <label style={{display: 'block', marginBottom: 6}}>Custom Query</label>
          <textarea value={customQuery} onChange={(e) => setCustomQuery(e.target.value)} rows={4} style={{width: '100%', padding: 8, borderRadius: 8}} />
        </div>
      ) : null}

      <div>
        <button type="submit" style={{padding: 12, width: '100%', borderRadius: 10, background: '#0ea5a1', color: '#042f2d', fontWeight: 800}}>Get Legal Remedy & Rights</button>
      </div>
    </form>
  );
}
