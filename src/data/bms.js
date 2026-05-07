export const bms = {
  account: 'Bristol Myers Squibb',
  confidential: true,
  lastUpdated: 'May 4, 2026',

  posture: {
    stage: 'Post-RFI evaluation',
    rfi: 'Insights Rewired',
    decisionCenter: 'CASA (Commercialization AI Strategy & Analytics)',
    closeTargetSeed: 'Q2 2026 ($5–6M)',
    closeTargetTransformational: 'Q1 2027 ($20–30M)',
    currentAdobeSpend: '$3.8M',
    techWin: 'Partial — trusted for content infrastructure, not yet strategic partner',
    nextMilestone: 'Adobe Day — BMS Princeton campus, June 2, 2026',
    dealModel: 'Mirror Merck — seed deal seeds relationship, transformational deal follows Q1 2027',
  },

  powerMap: {
    bms: [
      { name: 'Sumanth Srinivas', title: 'VP, Commercialization AI Products & Enablement (CASA)', role: 'Economic Buyer / Technical Champion', notes: 'Primary decision-maker. Came from Merck. Opening up post-Summit. CASA owns the evaluation.' },
      { name: 'Anvita [TBD]', title: 'SVP, Commercialization/Content', role: 'Executive Sponsor / Influencer', notes: 'Handpicked by Lankowski. Personally invested — was at Mumbai Mosaic launch. Admitted "no answer for omni-channel." Close relationship with Alanna Peet (Accenture).' },
      { name: 'Adam Lankowski', title: 'Chief Commercial Officer', role: 'Executive Sponsor / Decision Authority', notes: 'Most decisive exec. Goes "all in, no guardrails" when sold. Does not yet have deep Adobe relationship. Target for June 2.' },
      { name: 'Greg Myers', title: 'CIO', role: 'Technical Gatekeeper / Skeptic', notes: 'Hardest to win. Writes code himself. Requires technical credibility, not slides. Must have live demo at June 2.' },
      { name: 'Brian Mangene', title: 'Oversees Marketing + Marketing AI Products', role: 'User / Influencer', notes: 'Likely SFMC product owner thread. Roshni + Kam meeting with him.' },
      { name: 'Garrett [TBD]', title: 'BMS Architect', role: 'Technical Evaluator', notes: 'Attended workshop dinner. Surfaced Lankowski behavior pattern.' },
    ],
    adobe: [
      { name: 'Jonathan Fiur', title: 'Principal Solutions Consultant', role: 'Technical solutioning lead — AEP, analytics, agentic' },
      { name: 'Kam Bey', title: 'Enterprise Sales AM', role: 'Commercial motion owner; AD ~1 year on account' },
      { name: 'Miranda Manganaro', title: 'Strategic Pursuit Lead, HLS', role: 'Transformational pursuit lead; organized Apr 29 workshop' },
      { name: 'Anne Sharp', title: 'Director, Technical Pre-Sales, AEP', role: 'Platform depth; committed to June 2' },
      { name: 'Nicole Jeffries', title: 'Head of Transformational SC, HLS & CMT', role: 'Solution coherence' },
      { name: 'Mark Frazer', title: 'Principal, Transformational SC', role: 'Analytics modernization' },
      { name: 'Jonas Sjoquist', title: 'Sr. Group Manager, Strategic Advisory, HLS', role: 'Industry POV; Accenture relationship' },
    ],
    accenture: [
      { name: 'Alanna Peet', role: 'Main Accenture lead on BMS. Close personal relationship with Anvita.' },
      { name: 'Brian Choi', role: 'Lieutenant; heavy Summit engagement.' },
      { name: 'Sid Anand', role: 'Accenture sales lead across Merck and BMS — back-channel potential.' },
    ],
  },

  techLandscape: {
    adobe: [
      { product: 'AEM Sites', status: 'Active — in Mosaic stack', gap: 'On managed services; not cloud-native' },
      { product: 'AEM Assets', status: 'Active — in Mosaic stack', gap: 'On managed services; not cloud-native' },
      { product: 'Workfront', status: 'Active', gap: 'AI assistance roadmap not yet activated' },
      { product: 'Adobe Analytics', status: 'Active', gap: 'Legacy; no CJA; 2–4 week performance lag on content' },
    ],
    nonAdobe: [
      { product: 'Salesforce Marketing Cloud', vendor: 'Salesforce', role: 'Only activation channel; email-only', risk: 'high' },
      { product: 'Mosaic (custom platform)', vendor: 'Accenture-built', role: '$130M AI content hub; Mumbai-managed', risk: 'high' },
      { product: 'Databricks', vendor: 'Databricks', role: 'Recent major investment for data consolidation', risk: 'medium' },
    ],
    gaps: [
      'No content performance measurement (2–4 week lag; no CJA)',
      'No omni-channel orchestration — Anvita: "we have no answer for omni-channel"',
      'No personalization at scale',
      'No real-time data activation',
      'No AI-assisted content workflows beyond what Accenture built custom',
    ],
  },

  painToPlatform: [
    { pain: "Can't measure content performance in Mosaic", platform: 'Content Analytics + CJA', confidence: 'high' },
    { pain: 'Email-only; no omni-channel', platform: 'AJO for orchestration; Real-Time CDP for unified profile', confidence: 'high' },
    { pain: '20–30 new drug launches with shrinking field force', platform: 'AJO journey orchestration; AEP segmentation at scale', confidence: 'high' },
    { pain: 'Accenture building custom where Adobe already has it', platform: 'AEP roadmap mapping to Mosaic gaps', confidence: 'high' },
    { pain: 'Data siloed; no unified profile', platform: 'Real-Time CDP', confidence: 'high' },
    { pain: 'Patent cliff — must protect revenue while launching new brands', platform: 'Content velocity + personalization + HCP targeting', confidence: 'medium' },
    { pain: 'Agentic/AI content workflows on Mosaic roadmap', platform: 'AEM + Firefly + Agent Orchestrator', confidence: 'medium' },
    { pain: 'Greg Myers skepticism — wants technical proof', platform: 'Live platform demo; architecture walkthrough', confidence: 'high' },
  ],

  whitespace: {
    tier1: [
      { item: 'Content Analytics + CJA', rationale: 'No-friction entry. Maps directly to admitted gap. Layers on existing Adobe Analytics without requiring Accenture to change Mosaic.' },
      { item: 'AJO omni-channel pilot', rationale: 'Anvita has publicly admitted no answer. One brand, one channel expansion beyond email.' },
    ],
    tier2: [
      { item: 'Real-Time CDP', rationale: 'BMS already invested in Databricks; position RTCDP as the activation layer on top of existing data consolidation.' },
      { item: 'AEM Cloud migration', rationale: 'Move Sites + Assets off managed services; activate AI features (Firefly, GenStudio) within existing entitlements.' },
    ],
    tier3: [
      { item: 'Full AEP stack', rationale: 'Unified data, orchestration, analytics, AI across all brands and therapeutic areas.' },
      { item: 'Workfront AI + GenStudio', rationale: 'Accelerate Mosaic content velocity; displace custom Accenture build with off-shelf Adobe.' },
      { item: 'Agentic workflows', rationale: 'AI-driven HCP engagement and content routing; aligns to Mosaic vision and BMS AI investment.' },
    ],
  },

  competitive: [
    { competitor: 'Salesforce Marketing Cloud', threat: 'medium', notes: 'BMS already using SFMC for email activation. Displacement is the goal but must be sequenced after value established elsewhere.' },
    { competitor: 'Accenture custom build', threat: 'high', notes: 'Real competition is Accenture\'s incentive to custom-build vs. adopt Adobe off-shelf. Strategy: make Adobe adoption look like MORE Accenture work, not replacement.' },
    { competitor: 'Veeva', threat: 'low', notes: 'Not surfaced in transcript; monitor for HCP engagement positioning.' },
  ],

  openQuestions: [
    "Anvita's last name and exact title",
    "Garrett's last name (BMS architect at workshop dinner)",
    'Who owns SFMC product decisions at BMS? (Roshni + Kam meeting Brian Mangene)',
    "Has Greg Myers been engaged at all? What's the path to him?",
    'What are the 5 in-flight opportunities Kam referenced?',
    'Who is the executive producer of Adobe Day? Not assigned as of Apr 29.',
    'Is there a formal RFP process or is this a relationship/fit evaluation?',
    'Which Accenture capability areas are most at risk of Adobe displacement?',
  ],

  assumptions: [
    'Merck delivery by Rutstein\'s team is a desired (not required) prerequisite for Merck becoming a formal BMS reference.',
    'Accenture\'s 5-year handback timeline creates a natural window to expand Adobe\'s role as operations transfer back to BMS.',
    'Anvita and Sumanth\'s Merck background means the Adobe Merck narrative will resonate — they lived it.',
    'Greg Myers will not be won by slides; he needs a live technical session.',
  ],
};
