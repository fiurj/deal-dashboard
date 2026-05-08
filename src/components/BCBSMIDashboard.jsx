import { Provider, Tabs, TabList, Tab, TabPanel, Badge, StatusLight } from '@react-spectrum/s2';
import { bcbsmi } from '../data/bcbsmi.js';

// --- Shared Components ---

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: 14, borderLeft: '3px solid #0265dc', paddingLeft: 10 }}>
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', ...style }}>
      {children}
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ background: '#f0f0f0' }}>
          {headers.map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '2px solid #ccc', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#333', whiteSpace: 'nowrap' }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '12px 14px', borderBottom: '1px solid #e8e8e8', verticalAlign: 'top', lineHeight: 1.5, color: '#222' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const threatBadge = { high: 'negative', medium: 'notice', low: 'neutral', partner: 'informative' };

const dispositionColor = {
  positive: '#12805c',
  neutral: '#6e6e6e',
  skeptic: '#d7373f',
  unknown: '#999',
};

const priorityConfig = {
  critical: { color: '#d7373f', bg: '#fff4f4', border: '#ffd0d0', label: 'Critical' },
  high:     { color: '#0265dc', bg: '#f0f6ff', border: '#c5dcff', label: 'High' },
  medium:   { color: '#6e6e6e', bg: '#fafafa', border: '#e8e8e8', label: 'Medium' },
};

// --- Header ---

function Header() {
  const s = bcbsmi.status;
  return (
    <div style={{ background: '#111', color: '#fff', padding: '22px 40px', borderBottom: '3px solid #0265dc' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <Badge variant="accent" size="S">Stage {s.stage} — {s.stageLabel}</Badge>
            <Badge variant="notice" size="S">{s.adjCommit}</Badge>
            <Badge variant="negative" size="S" fillStyle="outline">Adobe Confidential</Badge>
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Blue Cross Blue Shield of Michigan
          </h1>
          <div style={{ fontSize: 13, color: '#999' }}>
            {bcbsmi.type} &middot; {bcbsmi.hq} &middot; {s.dr} &middot; TD: {s.td}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#666' }}>
          <div style={{ fontWeight: 600, color: '#aaa' }}>Last Updated: {bcbsmi.lastUpdated}</div>
          <div style={{ marginTop: 4, color: '#555' }}>AD: {s.ad}</div>
        </div>
      </div>
    </div>
  );
}

// --- Stat Cards ---

function StatCards() {
  return (
    <div style={{ background: '#e8e8e8', borderBottom: '2px solid #ccc', padding: '20px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 1200, margin: '0 auto' }}>
        {[
          { label: 'Pipeline GNRR', value: bcbsmi.status.gnrr, sub: 'Target close Q4 2026' },
          { label: 'Entry Point', value: 'CJA + Healthcare Shield', sub: bcbsmi.pipeline.entryRationale },
          { label: 'Existing Footprint', value: 'AEM + AA', sub: bcbsmi.pipeline.footprint },
          { label: 'Tech Risk', value: bcbsmi.status.techRisk, sub: bcbsmi.status.techRiskNote },
          { label: 'Exec Visibility', value: '2 Levels', sub: 'Sean Kiley AD mgr + Amy Lynn LeDuc HLS GM' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #bbb', borderRadius: 8, padding: '14px 18px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#0265dc', marginBottom: 3, lineHeight: 1.2 }}>{value}</div>
            <div style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Next Steps Cards ---

function NextStepsCards() {
  return (
    <div style={{ background: '#e8e8e8', padding: '0 40px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, maxWidth: 1200, margin: '0 auto' }}>
        {bcbsmi.nextSteps.map((step) => (
          <div key={step.id} style={{
            background: '#fff',
            border: '1px solid #0265dc',
            borderRadius: 8,
            padding: '16px 20px',
            borderTop: '4px solid #0265dc',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <Badge variant="accent" size="S" fillStyle="subtle">{step.type}</Badge>
              <Badge variant="notice" size="S" fillStyle="subtle">{step.status}</Badge>
            </div>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2, color: '#111' }}>{step.name}</div>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>Owner: {step.owner}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[step.description].filter(Boolean).map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#555', lineHeight: 1.4 }}>
                  <span style={{ color: '#0265dc', flexShrink: 0, marginTop: 2 }}>›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Tab Panels ---

function OverviewTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <SectionLabel>Deal Posture</SectionLabel>
        <div style={{ background: '#0265dc', borderRadius: 8, padding: '20px 28px', boxShadow: '0 2px 8px rgba(2,101,220,0.3)' }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.7, color: '#fff', fontStyle: 'italic' }}>
            "{bcbsmi.status.dealCharacter}"
          </p>
        </div>
      </div>

      <div>
        <SectionLabel>Motion & Budget Posture</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          <Card>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: 8 }}>Expansion Motion</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: '#333' }}>{bcbsmi.status.motion}</div>
          </Card>
          <Card>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: 8 }}>Budget Posture</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: '#333' }}>{bcbsmi.status.budgetPosture}</div>
          </Card>
          <Card style={{ borderLeft: '3px solid #0265dc' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', marginBottom: 8 }}>Executive Visibility</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: '#333' }}>{bcbsmi.status.executiveVisibility}</div>
          </Card>
        </div>
      </div>

      <div>
        <SectionLabel>Validated Use Cases — Apr 28 Demo</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bcbsmi.validatedUseCases.map((uc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '14px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0265dc', color: '#fff', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#111' }}>{uc.name}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {uc.products.map((p) => <Badge key={p} variant="informative" size="S" fillStyle="subtle">{p}</Badge>)}
                </div>
              </div>
              <Badge variant="positive" size="S" fillStyle="subtle">{uc.maturity}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Whitespace — Land-and-Expand Roadmap</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {bcbsmi.whitespace.map((tier) => (
            <div key={tier.tier}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0265dc', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Tier {tier.tier} — {tier.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 16, borderLeft: '2px solid #0265dc' }}>
                {tier.items.map((item) => (
                  <Card key={item.name}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#111' }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{item.rationale}</div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function PowerMapTab() {
  const { bcbsmi: contacts, adobe } = bcbsmi.powerMap;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <SectionLabel>BCBS Michigan — Stakeholder Map</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {contacts.map((s) => (
            <div key={s.name} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '14px 18px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: dispositionColor[s.disposition] || '#999', marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                  <Badge variant="neutral" size="S" fillStyle="subtle">{s.role}</Badge>
                  <Badge variant="neutral" size="S" fillStyle="outline">{s.thread}</Badge>
                </div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{s.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Adobe Team</SectionLabel>
        <DataTable
          headers={['Name', 'Title', 'Role']}
          rows={adobe.map((s) => [<strong>{s.name}</strong>, s.title, s.role])}
        />
      </div>
    </div>
  );
}

function DiscoveryTab() {
  const { context, sections } = bcbsmi.discovery;
  const order = ['critical', 'critical', 'high', 'high', 'medium'];
  const sorted = [...sections].sort((a, b) => order.indexOf(a.priority) - order.indexOf(b.priority));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      <Card style={{ borderLeft: '4px solid #d7373f', background: '#fff8f0' }}>
        <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#d7373f', marginBottom: 8 }}>Discovery Context</div>
        <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.7 }}>{context}</p>
      </Card>

      {sorted.map((section) => {
        const cfg = priorityConfig[section.priority] || priorityConfig.medium;
        return (
          <div key={section.area}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <SectionLabel>{section.area}</SectionLabel>
              <Badge
                variant={section.priority === 'critical' ? 'negative' : section.priority === 'high' ? 'accent' : 'neutral'}
                size="S"
                fillStyle="bold"
              >{cfg.label} Priority</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {section.questions.map((item, i) => (
                <div key={i} style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  borderLeft: `4px solid ${cfg.color}`,
                  borderRadius: 8,
                  padding: '16px 20px',
                }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: cfg.color, color: '#fff', fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      {i + 1}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#111', lineHeight: 1.5 }}>{item.q}</div>
                  </div>
                  <div style={{ paddingLeft: 34, fontSize: 12, color: '#555', lineHeight: 1.6, fontStyle: 'italic' }}>
                    <span style={{ fontWeight: 700, fontStyle: 'normal', color: cfg.color }}>Why: </span>{item.why}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CompetitiveTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionLabel>Competitive Dynamics</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bcbsmi.competitive.map((c) => (
            <div key={c.competitor} style={{
              background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '16px 20px',
              borderLeft: `4px solid ${c.threat === 'high' ? '#d7373f' : c.threat === 'medium' ? '#e68619' : '#aaa'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{c.competitor}</span>
                <StatusLight variant={threatBadge[c.threat] || 'neutral'}>{c.threat} threat</StatusLight>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.7 }}>{c.notes}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Incumbent Adobe Footprint</SectionLabel>
        <DataTable
          headers={['Product', 'Status', 'Gap / Risk']}
          rows={bcbsmi.techLandscape.adobe.map((t) => [<strong>{t.product}</strong>, t.status, t.gap])}
        />
      </div>

      <div>
        <SectionLabel>Non-Adobe Stack</SectionLabel>
        <DataTable
          headers={['Product', 'Vendor', 'Role / Risk']}
          rows={bcbsmi.techLandscape.nonAdobe.map((t) => [
            <strong>{t.product}</strong>,
            t.vendor,
            <span>{t.role}{' '}<Badge variant={threatBadge[t.risk] || 'neutral'} size="S" fillStyle="subtle">{t.risk}</Badge></span>,
          ])}
        />
      </div>

      <div>
        <SectionLabel>Key Gaps (Wedge Opportunities)</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bcbsmi.techLandscape.gaps.map((g, i) => (
            <div key={i} style={{ padding: '10px 16px', background: '#fff4f4', border: '1px solid #ffd0d0', borderRadius: 6, fontSize: 13, lineHeight: 1.6 }}>
              {g}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OpenItemsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionLabel>Open Items</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bcbsmi.openItems.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6 }}>
              <Badge variant="notice" size="S" fillStyle="subtle">{i + 1}</Badge>
              <span style={{ fontSize: 13, lineHeight: 1.6 }}>{q}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Assumptions</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bcbsmi.assumptions.map((a, i) => (
            <div key={i} style={{ padding: '12px 16px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6, borderLeft: '3px solid #0265dc', fontSize: 13, lineHeight: 1.6 }}>
              {a}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main ---

export default function BCBSMIDashboard() {
  return (
    <Provider colorScheme="light" locale="en-US">
      <div style={{ minHeight: '100vh', background: '#e4e4e4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <Header />
        <StatCards />
        <NextStepsCards />

        <div style={{ padding: '32px 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
          <Tabs defaultSelectedKey="overview" aria-label="BCBS Michigan Deal Dashboard">
            <TabList>
              <Tab id="overview">Overview</Tab>
              <Tab id="powermap">Power Map</Tab>
              <Tab id="discovery">Discovery</Tab>
              <Tab id="competitive">Competitive</Tab>
              <Tab id="openitems">Open Items</Tab>
            </TabList>
            <TabPanel id="overview"><div style={{ paddingTop: 28 }}><OverviewTab /></div></TabPanel>
            <TabPanel id="powermap"><div style={{ paddingTop: 28 }}><PowerMapTab /></div></TabPanel>
            <TabPanel id="discovery"><div style={{ paddingTop: 28 }}><DiscoveryTab /></div></TabPanel>
            <TabPanel id="competitive"><div style={{ paddingTop: 28 }}><CompetitiveTab /></div></TabPanel>
            <TabPanel id="openitems"><div style={{ paddingTop: 28 }}><OpenItemsTab /></div></TabPanel>
          </Tabs>
        </div>
      </div>
    </Provider>
  );
}
