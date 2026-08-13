// Simple rule-based legal analysis engine (no external deps)
export function analyzeLegalProblem(problemText = '', category = 'police', profile = {}) {
  const text = (problemText || '').toLowerCase();
  const acts = new Set();
  const dos = [];
  const donts = [];
  const protections = [];
  const helplines = new Set();

  // Category base mapping
  if (category === 'police') {
    acts.add('Code of Criminal Procedure (CrPC)');
    acts.add('Indian Constitution (Articles 20 & 21)');
    dos.push('Ask the officer the reason for detention and request a written order.');
    dos.push('Inform a family member and request a lawyer immediately.');
    dos.push('Insist on being produced before a magistrate within 24 hours.');
    donts.push('Do not sign blank documents.');
    donts.push('Do not give statements without legal counsel.');
    helplines.add('Police Emergency: 100');
  }

  if (category === 'consumer') {
    acts.add('Consumer Protection Act, 2019');
    dos.push('Preserve invoices, screenshots and communications.');
    dos.push('Raise complaint with the seller and the e-commerce grievance portal.');
    dos.push('Escalate to District Consumer Forum if unresolved.');
    donts.push('Do not discard packaging or proof of purchase.');
    helplines.add('National Consumer Helpline: 1800-11-4000');
  }

  if (category === 'cyber') {
    acts.add('Information Technology Act, 2000');
    dos.push('Take screenshots and preserve URLs and metadata of offending content.');
    dos.push('Report the content to the platform immediately.');
    dos.push('File an FIR at the cyber cell if harassment continues.');
    donts.push('Do not engage in online retaliation.');
    helplines.add('Cyber Crime Portal: https://cybercrime.gov.in/');
  }

  if (category === 'finance') {
    acts.add('RBI Guidelines; Banking Ombudsman Scheme');
    dos.push('Contact your bank immediately and block the card/account.');
    dos.push('Gather transaction details and raise a written dispute with the bank.');
    dos.push('Escalate to Banking Ombudsman if unresolved.');
    donts.push('Do not share OTPs or PINs with anyone.');
    helplines.add('RBI: https://www.rbi.org.in/');
  }

  // Keyword detection
  if (text.includes('sc/st') || text.includes('dalit') || text.includes('caste')) {
    acts.add('SC/ST (Prevention of Atrocities) Act, 1989');
    protections.push('SC/ST Atrocities Act protections');
    dos.unshift('Ensure immediate FIR registration and inform state legal aid.');
  }

  if (text.includes('disab') || profile?.disability === true) {
    acts.add('Rights of Persons with Disabilities Act, 2016');
    protections.push('PwD Act 2016 protections (accessible communication, support person)');
  }

  if (text.includes('impersonat') || text.includes('defamation') || text.includes('harass')) {
    acts.add('Indian Penal Code (relevant sections)');
  }

  if (text.includes('upi') || text.includes('transaction') || text.includes('fraud')) {
    acts.add('RBI Guidelines; IPC for fraud');
  }

  if (text.includes('defect') || text.includes('refund') || text.includes('warranty')) {
    acts.add('Consumer Protection Act, 2019');
  }

  // Fear-busting facts
  donts.push('You have fundamental rights — you can seek legal aid and official remedies.');
  donts.push('Minor delays do not waive your right to file a complaint.');

  // Trim and unique actions (keep up to 6)
  const uniqDos = Array.from(new Set(dos)).slice(0, 6);
  const uniqDonts = Array.from(new Set(donts)).slice(0, 6);

  // Build auto-draft notice
  const dateStr = new Date().toLocaleDateString();
  const draft = `Date: ${dateStr}\n\nTo\nThe Officer-in-Charge,\n[Relevant Office]\n\nSubject: Formal Complaint / Legal Notice\n\nI, [Name], resident of [Address], wish to formally notify and complain about the following incident:\n\n${problemText || '[Describe incident]'}\n\nRelevant facts: (briefly state facts)\n\nApplicable laws and acts: ${Array.from(acts).join(', ')}\n\nRelief sought: (describe remedy required)\n\nContact: [Phone / Email]\n\nRegards,\n[Name]\n`;

  return {
    problemText: problemText || '',
    category,
    acts: Array.from(acts),
    dos: uniqDos,
    donts: uniqDonts,
    protections,
    helplines: Array.from(helplines),
    draft
  };
}

export default analyzeLegalProblem;
