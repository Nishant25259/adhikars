export const kyrData = {
  categories: [
    { id: 'police', name: 'Police & Custody', icon: '👮' },
    { id: 'consumer', name: 'Consumer & Digital', icon: '🛍️' },
    { id: 'cyber', name: 'Cyber Crime', icon: '💻' },
    { id: 'finance', name: 'Finance & Banking', icon: '💳' }
  ],

  scenarios: {
    police: {
      law: 'Code of Criminal Procedure (CrPC); Articles 20 & 21, Indian Constitution',
      summary: 'Right to know reason for arrest, consult a lawyer, and be produced before a magistrate within 24 hours.',
      dos: [
        'Ask the officer the reason for detention and request a written order.',
        'Inform a family member and request to consult a lawyer immediately.',
        'Ask to be produced before a magistrate within 24 hours and request medical attention if injured.'
      ],
      donts: [
        'Do not sign blank or ambiguous documents.',
        'Do not give statements without a lawyer present.',
        'Avoid physical confrontation that can escalate the situation.'
      ],
      disabilityRights: 'Under Rights of Persons with Disabilities Act 2016: accessible communication, allowed support person, priority medical care and legal aid.',
      casteProtections: 'If SC/ST, register FIR immediately; offences may be covered under SC/ST (Prevention of Atrocities) Act for expedited action and state legal aid.',
      helpline: 'Police Emergency: 100; National Legal Services Authority: 1800-xxx-xxxx',
      draftTemplate:
        'To: The Station House Officer\nSubject: Complaint regarding unlawful arrest/detention\n\nI, [Name], resident of [Address], state that ... (facts). I request immediate legal remedy under applicable provisions.'
    },

    consumer: {
      law: 'Consumer Protection Act, 2019; Information Technology Rules (for e-commerce)',
      summary: 'Right to a refund, replacement, or compensation for defective or misrepresented goods bought online or offline.',
      dos: [
        'Preserve invoices, order screenshots and correspondence with the seller.',
        'Raise complaint with the seller and use the e-commerce grievance portal.',
        'If unresolved, file a complaint with the District Consumer Forum.'
      ],
      donts: [
        'Do not discard packaging or proof of purchase.',
        'Avoid posting unverified allegations — stick to facts.',
        'Do not miss statutory limitation periods for consumer claims.'
      ],
      disabilityRights: 'Accessible complaint filing and assistance under RPwD Act; request reasonable accommodation when visiting forums.',
      casteProtections: 'SC/ST victims may access state legal aid and priority consideration in some welfare cells.',
      helpline: 'National Consumer Helpline: 1800-11-4000 / 14404',
      draftTemplate:
        'To: The Manager / Grievance Officer\nSubject: Complaint regarding defective product / service\n\nI, [Name], purchased ... on [date]. The product/service is defective because ... I seek refund/replacement/compensation.'
    },

    cyber: {
      law: 'Information Technology Act, 2000; IPC sections on defamation, fraud and impersonation',
      summary: 'You can report online harassment, impersonation and data theft to the platform and file an FIR with cyber cell.',
      dos: [
        'Take screenshots and preserve URLs and metadata of offensive content.',
        'Report the content and impersonating account to the platform immediately.',
        'Consider filing an FIR at the local police cyber cell and the national cybercrime portal.'
      ],
      donts: [
        'Do not engage in public retaliation or threats.',
        'Avoid deleting evidence before reporting it.',
        'Do not share personal sensitive information while resolving the issue.'
      ],
      disabilityRights: 'Ensure accessible reporting channels; request documentation in accessible formats where needed.',
      casteProtections: 'If targeted due to caste, incidents may attract additional sections under IPC and SC/ST PoA Act depending on context.',
      helpline: 'Cyber Crime Reporting Portal: https://cybercrime.gov.in/',
      draftTemplate:
        'To: The Officer-in-Charge, Cyber Cell\nSubject: Complaint regarding online impersonation / harassment\n\nI, [Name], report that ... Please investigate and take necessary action under IT Act and IPC.'
    },

    finance: {
      law: 'RBI Guidelines; Banking Ombudsman Scheme; Indian Penal Code for fraud',
      summary: 'Report unauthorised transactions immediately to the bank, block cards, and escalate to ombudsman if unresolved.',
      dos: [
        'Contact the bank immediately and block the card/account.',
        'Collect transaction details and raise a written dispute with the bank.',
        'Escalate to Banking Ombudsman or file police complaint if fraud occurred.'
      ],
      donts: [
        'Do not share OTPs, PINs or banking credentials with anyone.',
        'Avoid delaying the report — immediate action improves recovery chances.',
        'Do not post sensitive banking information publicly.'
      ],
      disabilityRights: 'Banks must provide reasonable accommodation and accessible communication; support person assistance where required.',
      casteProtections: 'Victims from SC/ST backgrounds may avail state legal aid; ensure FIR if fraud targets based on vulnerability.',
      helpline: 'RBI: https://www.rbi.org.in/; Banking Ombudsman: check RBI site for local numbers',
      draftTemplate:
        'To: Branch Manager / Grievance Officer\nSubject: Complaint regarding unauthorised transaction\n\nI, [Name], account number ... observed unauthorised transaction on [date] for amount ... I request immediate reversal and investigation.'
    }
  }
};

export default kyrData;
