export const bcbsmi = {
  account: 'Blue Cross Blue Shield of Michigan',
  aliases: 'BCBSM / BCBS MI',
  type: 'Mutual — Not-for-Profit Health Insurer',
  hq: 'Detroit, MI',
  lastUpdated: 'May 5, 2026',
  confidential: true,

  status: {
    stage: 3,
    stageLabel: 'Qualification',
    dr: 'DR4694238',
    gnrr: '$1.776M',
    close: 'Q4 2026',
    adjCommit: 'Upside',
    td: 'Jonathan Fiur',
    priorTd: 'Jim Scanlon',
    ad: 'Sean Kiley',
    techWin: false,
    techRisk: 'Medium',
    techRiskNote: 'Client engagement has been tepid. Need to unlock CIO interest — Brett Trelfa is the gap.',
    motion: 'Platform expansion — AEP/RTCDP, AJO, CJA on top of existing AEM Sites + Adobe Analytics',
    executiveVisibility: 'Deal is important to Sean Kiley\'s AD manager Jeff Pope AND Amy Lynn LeDuc (HLS vertical sales GM). Two levels of Adobe leadership watching.',
    budgetPosture: '2026 is efficiency-focused, not heavy investment. Land-and-expand: scoped pilot → demonstrated value → platform commitment.',
    dealCharacter: 'Apr 28 digital strategy read-back and demo completed successfully. Three use cases validated. Moving from education phase into value quantification and activation planning.',
  },

  pipeline: {
    gnrr: '$1.776M',
    footprint: 'AEM Sites + Adobe Analytics (incumbent)',
    entryPoint: 'CJA + Healthcare Shield',
    entryRationale: 'Lowest friction: existing AA + AEM data. Immediate value: person-level analytics. Zero new infrastructure.',
  },

  nextSteps: [
    {
      id: 'bvc',
      name: 'Business Value Case Session',
      type: 'Client-Facing',
      status: 'Calendaring TBD',
      description: 'Quantify value per use case — short-term first, then long-term.',
      owner: 'Sean Kiley / Jonathan',
      watchPoints: ['Waiting on BCBSM feedback to calendar', 'ROI must land on medical cost reduction and operational efficiency — not revenue growth (mutual)', 'Lori owns business case; Brett must see architecture path'],
    },
    {
      id: 'ucaws',
      name: 'Use Case Activation Working Session',
      type: 'Client-Facing',
      status: 'Calendaring TBD',
      description: 'Crawl/walk/run plan mapping AEP capabilities to each validated use case.',
      owner: 'Jonathan',
      watchPoints: ['Three validated use cases: care gap closure, care steerage, pharmacy adherence', 'Must address channel-centric → outcome-driven/journey-led shift', 'Data fragmentation is primary personalization constraint — frame AEP as the solution'],
    },
    {
      id: 'orch',
      name: 'Orchestration Discussion',
      type: 'Client-Facing',
      status: 'Calendaring TBD',
      description: 'Joint mapping of what orchestration means at BCBSM today — including teams building bespoke solutions independently. Align on Adobe\'s unifying approach.',
      owner: 'Jonathan',
      watchPoints: ['Multiple BUs sending members outreach independently — no central decisioning', 'AJO as orchestration brain sitting above SFMC as send channel is the viable positioning', 'Do not lead with SFMC displacement narrative'],
    },
    {
      id: 'dam',
      name: 'Enterprise DAM Discussion',
      type: 'Client-Facing',
      status: 'Calendaring TBD',
      description: 'DAM capabilities coming with AEM move to Cloud Services — governance, brand consistency, centralized assets.',
      owner: 'Sean Kiley',
      watchPoints: ['Natural follow-on to existing AEM relationship', 'Jennifer Benavides is the sponsor', 'Do not lead with AEM Sites cloud migration — start with Assets'],
    },
  ],

  validatedUseCases: [
    { name: 'Closing care gaps and driving annual wellness', products: ['AJO', 'RT-CDP', 'CJA'], maturity: 'Validated — Apr 28 demo' },
    { name: 'Care steerage toward high-value, in-network providers', products: ['RT-CDP', 'AJO', 'Target'], maturity: 'Validated — Apr 28 demo' },
    { name: 'Pharmacy program optimization and adherence', products: ['AJO', 'RT-CDP'], maturity: 'Validated — Apr 28 demo' },
  ],

  whitespace: [
    {
      tier: 1, label: 'Crawl (0–6 months)',
      items: [
        { name: 'CJA + Healthcare Shield', rationale: 'Lowest friction entry. Existing AA + AEM data. Person-level analytics. Jennifer Benavides + Brian Stager are sponsors. Identity resolution pilot on 1–2 journeys (enrollment + billing).' },
      ],
    },
    {
      tier: 2, label: 'Walk (6–18 months)',
      items: [
        { name: 'AEP / RT-CDP — Unified Member Profiles', rationale: 'Requires data governance progress from Brett. Once MDM path is clear, RT-CDP becomes the activation layer.' },
        { name: 'AJO — Care Gap NBA Orchestration', rationale: 'Medicare space: many vendors, many outreaches, centralized decisioning needed. AJO sits above SFMC as orchestration brain.' },
      ],
    },
    {
      tier: 3, label: 'Run (18–36 months)',
      items: [
        { name: 'Omnichannel Orchestration (Partner Channels)', rationale: 'Optum, Teladoc, Maven. Requires unified profile and proven AJO foundation.' },
        { name: 'Predictive AI / Segment of One', rationale: 'Builds on RT-CDP profile + Brett\'s internal AI engine — position as complementary activation layer.' },
        { name: 'Enterprise MDM Integration', rationale: 'Brett\'s stated prerequisite. Long-term unlock for full platform story.' },
      ],
    },
  ],

  powerMap: {
    bcbsmi: [
      { name: 'Lori Dotson', title: 'VP, Digital & Automation Business Strategy', role: 'Economic Buyer', thread: 'Business case', disposition: 'positive', notes: 'Reports to Chief Transformation Officer. Owns data governance (4-person team). Digital experience is the product. Concerned about outsourced vendor control (Optum, pharmacy). Frame ROI around efficiency and medical cost, not revenue growth.' },
      { name: 'Brett Trelfa', title: 'SVP & CIO', role: 'Technical Gatekeeper', thread: 'Architecture sign-off', disposition: 'skeptic', notes: 'New to role. Built internal AI engine on AWS. Wants MDM fixed first. Disputes with Lori on member data ownership. Exploring Claude/Anthropic, Cursor, Databricks. Must be dual-threaded — he can block everything. Do not pitch without his architecture path.' },
      { name: 'Jennifer Benavides', title: 'Dir, Digital Product / UX / Content, Member Experiences', role: 'Champion', thread: 'CJA / Content Analytics', disposition: 'positive', notes: 'Came from automotive/consumer. Wants ecomm-style site experience. Heatmaps, abandon tracking, revenue attribution. Natural CJA + Content Analytics sponsor. Start here for Tier 1.' },
      { name: 'Jason Machasic', title: 'Dir, Corporate Marketing & Member Engagement', role: 'Champion', thread: 'AJO / Journey Orchestration', disposition: 'positive', notes: 'Consumer-led background. Lifecycle-stage engagement, moments that matter. Natural AJO champion. Partner with Jennifer to build joint business case.' },
      { name: 'Michelle Powel', title: 'Marketing Ops & Performance Director', role: 'Ops Ally', thread: 'Execution', disposition: 'neutral', notes: 'Bridge between marketing and IT. Execution ally. Will be the person who operationalizes whatever gets decided.' },
      { name: 'Brian Stager', title: 'Dir, Digital Experience Operations', role: 'Ops Ally', thread: 'CJA / Analytics', disposition: 'positive', notes: 'Very manual today. Wants data-driven solutions. CJA sponsor alongside Jennifer.' },
      { name: 'Mike Benoit', title: 'Sr Dir, Digital Platform Mgmt & Services', role: 'Platform Owner', thread: 'AEM / Tech', disposition: 'neutral', notes: 'Platform owner. Needs to be aligned on AEM cloud migration path.' },
      { name: 'Ganesh Vaithiyanathan', title: 'Sr IT Leader, Digital Experience', role: 'IT Counterpart', thread: 'Technical', disposition: 'neutral', notes: 'IT counterpart to Lori. Part of Lori/Brian/Jennifer product-mindset triad.' },
    ],
    adobe: [
      { name: 'Jonathan Fiur', title: 'Principal Solutions Consultant', role: 'TD (from Jim Scanlon, May 2026) — AEP, AJO, CJA, agentic' },
      { name: 'Sean Kiley', title: 'Account Director', role: 'AD / Business Driver (TPS confirmed)' },
      { name: 'Jim Scanlon', title: 'Senior Solutions Consultant', role: 'Prior TD — handoff complete; available for context' },
    ],
  },

  techLandscape: {
    adobe: [
      { product: 'AEM Sites', status: 'Active — bcbsm.com (~900 pages, 9.9M visits)', gap: 'Cloud migration not yet done. Do NOT pitch Sites cloud migration first — start with Assets.' },
      { product: 'AEM Headless CMS', status: 'Active — Member Portal + Mobile App (10M + 11M visits)', gap: 'Large surface area for Content Analytics instrumentation.' },
      { product: 'Adobe Analytics', status: 'Active — aggregate only', gap: 'Not HIPAA compliant for person-level. No Content Analytics. Healthcare Shield is the unlock for person-level work.' },
    ],
    nonAdobe: [
      { product: 'Salesforce CRM', vendor: 'Salesforce', role: 'Multiple instances — no unified member view', risk: 'medium' },
      { product: 'Salesforce Marketing Cloud', vendor: 'Salesforce', role: '46M emails + ~1M SMS/yr — primary activation channel', risk: 'high' },
      { product: 'Salesforce Communities', vendor: 'Salesforce', role: 'Agent/group portal', risk: 'low' },
      { product: 'Pega + Genesis', vendor: 'Pega', role: 'Call center', risk: 'low' },
      { product: 'Databricks + AWS', vendor: 'AWS / Databricks', role: 'Data/ML infrastructure — Brett\'s investment. AEP = activation layer on top, not replacement.', risk: 'partner' },
      { product: 'Tableau', vendor: 'Salesforce', role: 'Primary BI tool', risk: 'medium' },
      { product: 'Internal AI Engine', vendor: 'BCBSM (Brett\'s team)', role: 'AWS + Claude/Anthropic. Respect it — position Adobe AI as governed, brand-safe activation layer.', risk: 'partner' },
      { product: 'NASCO', vendor: 'NASCO', role: 'Claims system', risk: 'low' },
    ],
    gaps: [
      'No CDP or identity stitching — no unified member profile across CRM, claims, digital',
      'No journey orchestration engine — multiple BUs sending outreach independently, no central decisioning',
      'No person-level digital analytics — AA is aggregate-only, not HIPAA compliant for member-level',
      'No next-best-action engine for care gaps, steerage, or pharmacy',
      'No cross-channel attribution — cannot tie digital behavior to clinical or cost outcomes',
      'No Content Analytics — cannot measure AEM content performance at member level',
    ],
  },

  competitive: [
    { competitor: 'Salesforce (SFMC + CRM)', threat: 'high', notes: 'Deeply embedded — CRM + SFMC + Communities. Displacement in one shot is a non-starter. Positioning: AJO as orchestration brain sitting above SFMC as send channel. Don\'t lead with displacement.' },
    { competitor: 'AWS / Databricks', threat: 'medium', notes: 'Brett is actively investing here. AEP = activation layer on top of their data infrastructure, not a replacement. Frame as complementary.' },
    { competitor: 'Brett\'s internal AI engine', threat: 'medium', notes: 'Built on AWS + Claude/Anthropic. Respect it — do not compete with it. Position Adobe AI as the governed, brand-safe, compliance-ready activation layer for member channels.' },
    { competitor: 'Tableau', threat: 'low', notes: 'Primary BI tool. CJA is not a Tableau replacement — it\'s person-level journey analytics. Different job.' },
  ],

  discovery: {
    context: 'Apr 28 demo validated three use cases. Moving into value quantification. These questions must be answered before Adobe can size the pilot, build the business case, or architect a credible solution.',
    sections: [
      {
        area: 'Data & Identity',
        priority: 'critical',
        questions: [
          { q: 'Where does member data live today — CRM, claims, clinical, digital — and who owns each system?', why: 'No unified member profile exists. Understanding data location and ownership (Lori vs. Brett) is prerequisite to any RT-CDP conversation.' },
          { q: 'How is member identity resolved across channels today, if at all?', why: 'Identity stitching is the foundation of every use case. If they have no answer, that\'s the opening.' },
          { q: 'What is the actual state of data governance? Brett called it "very dysfunctional" — what does that mean in practice?', why: 'Governs the timeline for Tier 2. If governance is 12+ months away, RT-CDP pilot must be scoped to what exists today.' },
          { q: 'Who owns member data when Lori and Brett disagree — how do decisions get made?', why: 'Known tension. Deal cannot advance without a clear data owner. Need to understand the escalation path.' },
          { q: 'What is the HIPAA compliance posture for digital analytics today — is there a DUA or BAA with Adobe?', why: 'Healthcare Shield requires a Business Associate Agreement. If one doesn\'t exist, that is a 60–90 day procurement step before any person-level work begins.' },
        ],
      },
      {
        area: 'Journey & Orchestration',
        priority: 'high',
        questions: [
          { q: 'What does a care gap intervention look like end-to-end today — who triggers it, through what channel, and how is outcome measured?', why: 'This is validated use case #1. Need to understand the current workflow to show AJO as an upgrade, not a rip-and-replace.' },
          { q: 'When multiple business units want to reach the same member simultaneously, who decides what gets sent?', why: 'If the answer is "nobody" — that is the AJO central decisioning pitch. If there is a process, understand it before proposing a replacement.' },
          { q: 'How are SFMC campaigns triggered today — batch/schedule or event-based?', why: 'Batch = huge AJO upgrade opportunity. Event-based = more sophisticated, need to understand what triggers exist.' },
          { q: 'What does care steerage look like today — is there any next-best-action logic or is it rules-based?', why: 'Use case #2. Helps size the gap between today\'s state and AJO + RT-CDP NBA.' },
          { q: 'How is pharmacy adherence tracked and acted on — what signals exist and what happens when a member goes off-track?', why: 'Use case #3. Understanding the current data pipeline for pharmacy events determines how hard RT-CDP integration will be.' },
        ],
      },
      {
        area: 'Technology & Architecture',
        priority: 'high',
        questions: [
          { q: 'What is the roadmap for Brett\'s internal AI engine — where does it end and where would a vendor platform begin?', why: 'Cannot position AEP without understanding this. Brett built something. Need to know what it does and what it doesn\'t do before proposing what Adobe replaces vs. complements.' },
          { q: 'When does the SFMC contract come up for renewal?', why: 'Renewal timing determines whether AJO displacement is a 2026 or 2027 conversation. Also signals leverage window.' },
          { q: 'How far along is the MDM initiative — what is the timeline and who owns it?', why: 'Brett said MDM must be fixed first. If MDM is 18 months out, RT-CDP Tier 2 slides right. Pilot must be scoped to what exists today.' },
          { q: 'What does the Databricks investment cover — is it production ML models in use, or exploratory?', why: 'Determines whether AEP\'s built-in ML is additive or redundant. If Databricks is production, AEP = activation layer on top.' },
          { q: 'Is there existing instrumentation on AEM properties for behavioral tracking, or would Content Analytics require net-new tagging?', why: 'Scopes the lift for CJA + Content Analytics Tier 1 pilot. If alloy.js is already deployed, effort drops significantly.' },
        ],
      },
      {
        area: 'Business Value & Budget',
        priority: 'critical',
        questions: [
          { q: 'What does "efficiency-focused" mean in 2026 — headcount reduction, medical cost ratio, cost per member outreach, or something else?', why: 'ROI must land on the metric Lori cares about. Must be efficiency or cost, not revenue growth (mutual).' },
          { q: 'How does BCBSM quantify a closed care gap — what is a prevented hospitalization or improved adherence rate worth in dollar terms?', why: 'This is the business case numerator. Without it, the value case session has no anchor.' },
          { q: 'Who owns the budget for a platform purchase vs. a point solution — is this Lori\'s budget, Brett\'s, or a shared pool?', why: 'Determines the approval path and who Jonathan needs to close with.' },
          { q: 'Is there 2026 initiative budget already allocated for this work, or does the business case need to create the budget?', why: 'Allocated budget = faster cycle. Unallocated = longer cycle, need a stronger ROI story earlier.' },
          { q: 'Has the Blue Shield of California reference been activated — have they spoken to the BCBS CA team?', why: 'Blue Shield CA is a natural peer reference on AEP for a payer. If Sean hasn\'t activated it, this is a near-term unlock.' },
        ],
      },
      {
        area: 'Stakeholders & Process',
        priority: 'medium',
        questions: [
          { q: 'Who on the BCBSM side is responsible for calendaring the four confirmed next steps — is it Lori, Migdalia, or someone else?', why: 'Waiting on BCBSM feedback per Sean\'s note. Need to know who to follow up with and how hard to push.' },
          { q: 'What does the procurement process look like for a platform investment of this size — legal, compliance, security review timelines?', why: 'Q4 2026 close requires procurement to start soon. Need to understand lead time.' },
          { q: 'Who needs to be involved in a Healthcare Shield / data governance approval at BCBSM?', why: 'Healthcare Shield requires legal and compliance sign-off. Need to know who owns that process and how long it takes.' },
          { q: 'Are there other vendors currently in evaluation for CDP, orchestration, or analytics — or is this a greenfield conversation?', why: 'If Salesforce Data Cloud or Microsoft are in evaluation, positioning changes significantly.' },
        ],
      },
    ],
  },

  openItems: [
    'Healthcare Shield appetite and budget tolerance — gates all person-level work',
    'Data governance actual state — Brett called it "very dysfunctional"; need specifics',
    'SFMC contract renewal timeline — affects displacement/complement positioning',
    'Who owns budget for platform buy vs. point solution?',
    'Has Blue Shield CA reference been activated?',
    'Who from BCBSM is calendaring the four next-step sessions?',
    'MDM timeline — if 18+ months out, Tier 2 slides right',
    'Existing AEM instrumentation / alloy.js deployment — scopes Content Analytics lift',
  ],

  assumptions: [
    'Brett\'s MDM-first stance is real but may soften if CJA pilot demonstrates value without requiring full MDM.',
    'AJO will not displace SFMC in 2026 — the correct positioning is AJO as orchestration layer above SFMC.',
    'Healthcare Shield BAA/DUA does not yet exist with BCBSM — this is a procurement step that must start immediately.',
    'Jennifer Benavides and Brian Stager can co-sponsor the CJA Tier 1 pilot without Brett\'s full buy-in.',
    'Lori and Brett will not self-resolve their data ownership dispute — Adobe must navigate around it, not through it.',
  ],
};
