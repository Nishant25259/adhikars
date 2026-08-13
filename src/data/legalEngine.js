// Rule-based legal analyzer for Adhikars — driven by src/data/kyrDatabase.json
import kyrData from './kyrDatabase.json';

// Map each JSON category name to a short id used across the app (must match
// the ids produced in ProblemInputForm.jsx) and a helpline shown to the user.
const CATEGORY_ID = {
  'Police & Custody': 'police',
  'Consumer Laws': 'consumer',
  'Labour Laws': 'labour',
  'Cyber Laws': 'cyber',
  'Fundamental Rights': 'fundamental',
  'General Rights': 'general',
  'Tax Laws': 'tax',
};

const HELPLINE_BY_ID = {
  police: 'Police Emergency: 100',
  consumer: 'National Consumer Helpline: 1915',
  labour: 'Shram Suvidha Portal: labour.gov.in',
  cyber: 'National Cyber Crime Helpline: 1930',
  fundamental: 'National Human Rights Commission: 1800-11-6666',
  general: 'RTI Online: rtionline.gov.in',
  tax: 'Income Tax e-Nivaran / CPGRAMS: incometax.gov.in',
};

const DONTS_BY_ID = {
  police: 'Do not sign or accept statements without legal counsel present.',
  consumer: 'Do not discard the product, packaging or proof of purchase.',
  labour: 'Do not resign or sign a settlement under pressure without reviewing it.',
  cyber: 'Do not share OTPs, PINs or credentials with anyone, even officials.',
  fundamental: 'Do not delay — constitutional remedies can have limitation periods.',
  general: 'Do not pay unofficial fees; RTI/public service fees are fixed by law.',
  tax: 'Do not act on notices without verifying them on the official e-filing portal.',
};

const RULES = (kyrData?.rules || []).map((r) => ({
  ...r,
  shortId: CATEGORY_ID[r.category] || r.category.toLowerCase().replace(/[^a-z]+/g, ''),
}));

function findRule(shortId) {
  return RULES.find((r) => r.shortId === shortId) || RULES[0];
}

export function analyzeLegalProblem(problemText = '', category = 'police', profile = {}) {
  const text = (problemText || '').toString().toLowerCase();
  const acts = new Set();
  const dos = [];
  const donts = [];
  const helplines = new Set();
  const specialProtections = [];

  const primaryRule = findRule(category);

  // Primary category's governing laws, guidance and helpline
  (primaryRule?.governing_laws || []).forEach((a) => acts.add(a));
  (primaryRule?.guidelines || []).forEach((g) => dos.push(g));
  if (HELPLINE_BY_ID[primaryRule?.shortId]) helplines.add(HELPLINE_BY_ID[primaryRule.shortId]);
  if (DONTS_BY_ID[primaryRule?.shortId]) donts.push(DONTS_BY_ID[primaryRule.shortId]);

  // Keyword heuristics: pull in other categories whose keywords appear in the text
  RULES.forEach((rule) => {
    if (rule.shortId === primaryRule?.shortId) return;
    const hit = (rule.keywords || []).some((k) => text.includes(k.toLowerCase()));
    if (hit) {
      (rule.governing_laws || []).forEach((a) => acts.add(a));
      if (rule.guidelines?.[0]) dos.push(rule.guidelines[0]);
      if (HELPLINE_BY_ID[rule.shortId]) helplines.add(HELPLINE_BY_ID[rule.shortId]);
      specialProtections.push(`Also relevant: ${rule.title}`);
    }
  });

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

  // Ensure at least three dos/donts
  while (dos.length < 3) dos.push('Document everything: date, time, persons involved and witnesses.');
  while (donts.length < 3) donts.push('Avoid confronting the accused alone; prioritize safety and evidence preservation.');

  if (helplines.size === 0) {
    helplines.add('Police Emergency: 100');
  }

  // legal rights summary — built from the primary rule's rights_summary
  const rightsText = (primaryRule?.rights_summary || []).join(' ');
  const legalRightsSummary = `${rightsText} This is an informational overview and not a substitute for formal legal advice.`.trim();

  // generated draft — use the rule's grievance template where available, filled with the facts
  const baseTemplate = primaryRule?.grievance_template || 'To,\nThe Concerned Authority,\nSubject: Formal Grievance\n\nI, {NAME}, hereby record my grievance and request appropriate action.';
  const filledTemplate = baseTemplate
    .replace(/\{NAME\}/g, profile?.name || '____________')
    .replace(/\{DATE\}/g, new Date().toLocaleDateString())
    .replace(/\{WORKPLACE\}/g, profile?.address || '____________');

  const generatedDraft = `${filledTemplate}\n\nStatement of facts:\n${problemText || '<<No problem text provided>>'}\n\nApplicable legal provisions (preliminary): ${Array.from(acts).join('; ')}.\n\nProfile details:\n- Caste/Category: ${profile?.caste || 'General'}\n- Disability: ${profile?.pwd ? 'PwD' : 'Non-Disabled'}\n- Gender: ${profile?.gender || 'General'}\n\nI submit this grievance in good faith and pray for prompt consideration and action.\n\nYours faithfully,\n\n${profile?.name || '____________'}`;

  return {
    applicableActs: Array.from(acts),
    legalRightsSummary,
    dos: dos.slice(0, 4),
    donts: donts.slice(0, 3),
    specialProtections,
    helplines: Array.from(helplines),
    generatedDraft,
  };
}

export default analyzeLegalProblem;
