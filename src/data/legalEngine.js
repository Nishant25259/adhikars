// Simple rule-based legal analyzer for Adhikars
export function analyzeLegalProblem(problemText = '', category = 'police', profile = {}) {
  const text = (problemText || '').toString().toLowerCase();
  const acts = new Set();
  const dos = [];
  const donts = [];
  const helplines = new Set();
  const specialProtections = [];

  // Basic category to statute mapping
  // authoritative mapping: include common statutes and recent guidance
  const categoryMap = {
    police: ['Indian Penal Code (IPC)', 'Criminal Procedure Code (CrPC)', 'BNSS 2023 Guidance'],
    consumer: ['Consumer Protection Act, 2019', 'Bureau of Indian Standards Guidance'],
    cyber: ['Information Technology Act, 2000', 'IT Rules & BNSS 2023 Cyber Guidance'],
    finance: ['Reserve Bank of India Guidelines', 'Negotiable Instruments Act']
  };

  (categoryMap[category] || []).forEach(a => acts.add(a));

  // keyword heuristics
  if (text.includes('fir') || text.includes('police') || text.includes('custody') || text.includes('assault')) {
    acts.add('Indian Penal Code (IPC)');
    acts.add('Criminal Procedure Code (CrPC)');
    acts.add('BNSS 2023 Guidance');
    helplines.add('Police Emergency: 100');
    dos.push('Attend the nearest police station and insist on an FIR entry; obtain a written receipt.');
    donts.push('Do not sign or accept statements without legal counsel present.');
  }

  if (text.includes('cyber') || text.includes('phishing') || text.includes('transaction') || text.includes('login') || text.includes('fraud') || text.includes('upi')) {
    acts.add('Information Technology Act, 2000');
    acts.add('BNSS 2023 Guidance');
    helplines.add('Cyber Crime Helpline: 1930');
    dos.push('Preserve all digital records: screenshots, transaction IDs, device logs and bank messages.');
    donts.push('Do not share OTPs, UPI PINs or credentials with anyone.');
  }

  if (text.includes('consumer') || text.includes('refund') || text.includes('defect') || text.includes('warranty') || text.includes('e-commerce')) {
    acts.add('Consumer Protection Act, 2019');
    helplines.add('Consumer Helpline: 1800-11-4000');
    dos.push('Preserve invoices, order IDs, seller communications and delivery proofs.');
    donts.push('Do not dispose of the defective product until advised by consumer forum or authority.');
  }

  if (text.match(/\u20b9|rs|rupee|\d{3,}/)) {
    acts.add('Reserve Bank of India Guidelines');
    helplines.add('Bank Customer Care (see bank)');
    dos.push('Report the transaction to your bank and raise an official dispute / chargeback.');
    donts.push('Do not transfer additional funds to unverified accounts.');
  }

  // Demographic protections
  if (profile?.pwd) {
    specialProtections.push('Rights under the Rights of Persons with Disabilities Act, 2016');
    acts.add('Rights of Persons with Disabilities Act, 2016');
    dos.push('Seek accessible reporting channels and request reasonable accommodation when filing complaints.');
  }
  if ((profile?.caste || '').toLowerCase() === 'sc/st') {
    specialProtections.push('Protection under SC/ST (Prevention of Atrocities) Act');
    acts.add('Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act');
    dos.push('Contact the nearest District SC/ST welfare officer and record the complaint in writing.');
  }
  if ((profile?.gender || '').toLowerCase() === 'woman') {
    specialProtections.push('Special protections for women under IPC and domestic violence law');
    dos.push('Consider filing an FIR and seek immediate protective orders, and contact women helplines.');
    helplines.add('Women Helpline: 181');
  }
  if ((profile?.age || '').toLowerCase() === 'senior') {
    specialProtections.push('Senior citizen protections under Maintenance and Welfare of Parents and Senior Citizens Act');
    dos.push('Reach out to local senior citizen support services and seek immediate legal aid.');
  }

  // Ensure at least three dos/donts
  while (dos.length < 3) dos.push('Document everything: date, time, persons involved and witnesses.');
  while (donts.length < 3) donts.push('Avoid confronting the accused alone; prioritize safety and evidence preservation.');

  if (helplines.size === 0) {
    helplines.add('Police Emergency: 100');
  }

  // legal rights summary
  const legalRightsSummary = `Preliminary assessment indicates potential applicability of: ${Array.from(acts).join(', ')}. This is an informational overview and not a substitute for formal legal advice.`;

  // generated draft (vintage/formal tone)
  const generatedDraft = `Office of the Petitioner\n\nDate: ${new Date().toLocaleDateString()}\n\nTo\nThe Officer In-Charge / Concerned Authority\n\nSubject: Formal Grievance and Request for Action under relevant statutes\n\nSir / Madam,\n\nI, ${profile?.name || '____________'}, of ${profile?.address || '____________'}, hereby submit the following statement of facts and request that appropriate action be taken under the applicable law.\n\nStatement of facts:\n${problemText || '<<No problem text provided>>'}\n\nApplicable legal provisions (preliminary): ${Array.from(acts).join('; ')}.\n\nRelief sought and steps requested:\n- That a formal enquiry be registered and records preserved.\n- That protection / interim measures be provided where applicable.\n- That appropriate prosecution / remedy be pursued under the relevant statutes.\n\nProfile details:\n- Caste/Category: ${profile?.caste || 'General'}\n- Disability: ${profile?.pwd ? 'PwD' : 'Non-Disabled'}\n- Gender/Age: ${profile?.gender || 'General'} / ${profile?.age || 'N/A'}\n\nI submit this grievance in good faith and pray for prompt consideration and action.\n\nYours faithfully,\n\n${profile?.name || '____________'}`;

  return {
    applicableActs: Array.from(acts),
    legalRightsSummary,
    dos: dos.slice(0,3),
    donts: donts.slice(0,3),
    specialProtections,
    helplines: Array.from(helplines),
    generatedDraft
  };
}

export default analyzeLegalProblem;
