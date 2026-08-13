import React, { useState } from 'react';

const QUICK = [
  'Wheelchair user denied FIR',
  'Cyber Fraud ₹20k deducted',
  'Defective phone refund refused',
  'Recovery agent home harassment'
];

export default function ProblemInputForm({ onAnalyze }) {
  const [category, setCategory] = useState('police');
  const [caste, setCaste] = useState('General');
  const [disability, setDisability] = useState(false);
  const [gender, setGender] = useState('General');
  const [text, setText] = useState('');

  function chooseQuick(q) { setText(q); }

  function dictate() { setText(prev => (prev ? prev + ' ' : '') + 'I require immediate assistance.'); }

  function submit(e) {
    e?.preventDefault?.();
    const profile = { caste, pwd: disability, gender, age: gender === 'Senior' ? 'Senior' : '' };
    onAnalyze?.(text, category, profile);
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="card">
        <div className="heading">Citizen Profile Context</div>
        <div className="demographics" style={{marginTop:8}}>
          <label className="label">Caste</label>
          <select className="input" value={caste} onChange={e=>setCaste(e.target.value)}>
            <option>General</option>
            <option>SC/ST</option>
            <option>OBC</option>
          </select>

          <label className="label">Disability</label>
          <select className="input" value={disability ? 'PwD' : 'Non-Disabled'} onChange={e=>setDisability(e.target.value === 'PwD')}>
            <option>Non-Disabled</option>
            <option>PwD</option>
          </select>

          <label className="label">Gender / Age</label>
          <select className="input" value={gender} onChange={e=>setGender(e.target.value)}>
            <option>General</option>
            <option>Woman</option>
            <option>Senior</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="heading">Legal Domain</div>
        <div className="persona-grid" style={{marginTop:8}}>
          <button type="button" className={`tile ${category==='police'?'active':''}`} onClick={()=>setCategory('police')}>👮 Police & Custody</button>
          <button type="button" className={`tile ${category==='consumer'?'active':''}`} onClick={()=>setCategory('consumer')}>🛍️ Consumer & Digital</button>
          <button type="button" className={`tile ${category==='cyber'?'active':''}`} onClick={()=>setCategory('cyber')}>💻 Cyber Crime</button>
          <button type="button" className={`tile ${category==='finance'?'active':''}`} onClick={()=>setCategory('finance')}>💳 Finance & Banking</button>
        </div>
      </div>

      <div className="card">
        <div className="heading">Describe Your Problem</div>
        <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
          {QUICK.map((q,i)=> (
            <button key={i} type="button" className="badge" onClick={()=>chooseQuick(q)}>{q}</button>
          ))}
        </div>

        <textarea className="textarea" value={text} onChange={e=>setText(e.target.value)} placeholder="Who, what, when, where — provide facts." />

        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button type="button" className="btn-ghost" onClick={dictate}>🎙️ Dictation</button>
          <button type="submit" className="btn-primary" style={{marginLeft:'auto'}}>Analyze</button>
        </div>
      </div>
    </form>
  );
}
