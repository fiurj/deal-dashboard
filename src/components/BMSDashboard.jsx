import { Provider, Tabs, TabList, Tab, TabPanel, Badge, StatusLight, Meter } from '@react-spectrum/s2';
import { bms } from '../data/bms.js';

// --- Utilities ---

function daysUntil(dateStr) {
  const today = new Date('2026-05-07');
  const target = new Date(dateStr);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const statusColor = {
  Active: '#0265dc',
  Pipeline: '#6e6e6e',
  Flagship: '#d7373f',
};

const dispositionColor = {
  positive: '#12805c',
  neutral: '#6e6e6e',
  skeptic: '#d7373f',
  unknown: '#999',
};

const threatBadge = { high: 'negative', medium: 'notice', low: 'neutral', partner: 'informative' };

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

// --- Header ---

function Header() {
  return (
    <div style={{ background: '#111', color: '#fff', padding: '22px 40px', borderBottom: '3px solid #0265dc' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <Badge variant="accent" size="S">Active Pursuit</Badge>
            <Badge variant="informative" size="S">SPP Designated</Badge>
            <Badge variant="positive" size="S">RFI Submitted</Badge>
            <Badge variant="negative" size="S" fillStyle="outline">Adobe Confidential</Badge>
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Bristol-Myers Squibb Company
          </h1>
          <div style={{ fontSize: 13, color: '#999' }}>
            Biopharmaceutical &middot; Princeton, NJ &middot; {bms.revenue} Revenue &middot; {bms.employees} Employees &middot; NYSE: {bms.ticker}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#666' }}>
          <div>Context {bms.contextVersion}</div>
          <div style={{ fontWeight: 600, color: '#aaa' }}>{bms.lastUpdated}</div>
          <div>{bms.author}</div>
        </div>
      </div>
    </div>
  );
}

// --- Stat Cards ---

function StatCards() {
  const nextEvent = bms.events.find(e => daysUntil(e.date) >= 0);
  const nextDays = nextEvent ? daysUntil(nextEvent.date) : null;
  const clientFacing = bms.events.filter(e => e.type !== 'Internal').length;
  const internal = bms.events.filter(e => e.type === 'Internal').length;
  const cards = [
    { label: 'Total Pipeline', value: `${bms.pipeline.totalLow}–${bms.pipeline.totalHigh}`, sub: `${bms.pipeline.areaCount} opportunity areas` },
    { label: 'Current Footprint', value: bms.pipeline.footprint, sub: 'DX + Creative + Document Cloud' },
    { label: 'Stage', value: `Stage ${bms.status.stage}`, sub: `TPS shows Stage ${bms.status.stageTps} — Trzaska/Anne confirmed 3` },
    { label: "Jonathan's June 2 Role", value: 'Scene 4 + Lab B', sub: 'RT-CDP / AJO / Activation' },
    { label: 'Next Event', value: nextDays !== null ? `${nextDays}d` : '—', sub: nextEvent ? nextEvent.name : '' },
    { label: 'Touchpoints', value: String(bms.events.length), subEl: <span><span style={{ color: '#12805c', fontWeight: 700 }}>● {clientFacing} client-facing</span>{'  '}<span style={{ color: '#6e6e6e' }}>● {internal} internal</span></span> },
  ];
  return (
    <div style={{ background: '#e8e8e8', borderBottom: '2px solid #ccc', padding: '20px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 1200, margin: '0 auto' }}>
        {cards.map(({ label, value, sub, subEl }) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #bbb', borderRadius: 8, padding: '14px 18px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0265dc', marginBottom: 3 }}>{value}</div>
            <div style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>{subEl || sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Milestone Cards ---

function MilestoneCards() {
  return (
    <div style={{ background: '#e8e8e8', padding: '0 40px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, maxWidth: 1200, margin: '0 auto' }}>
        {bms.events.map((ev) => {
          const days = daysUntil(ev.date);
          const isInternal = ev.type === 'Internal';
          return (
            <div key={ev.id} style={{
              background: '#fff',
              border: `1px solid ${isInternal ? '#b8860b' : '#0265dc'}`,
              borderRadius: 8,
              padding: '16px 20px',
              borderTop: `4px solid ${isInternal ? '#f0c33c' : '#0265dc'}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <Badge variant={isInternal ? 'notice' : 'accent'} size="S" fillStyle="subtle">{ev.type}</Badge>
                <div style={{ fontSize: 36, fontWeight: 900, color: isInternal ? '#b8860b' : '#0265dc', lineHeight: 1 }}>{days}<span style={{ fontSize: 13, fontWeight: 600, color: '#888', marginLeft: 4 }}>days</span></div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2, color: '#111' }}>{ev.name}</div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>{ev.format} &middot; {formatDate(ev.date)}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(ev.agenda || ev.watchPoints || []).slice(0, 3).map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#555', lineHeight: 1.4 }}>
                    <span style={{ color: isInternal ? '#b8860b' : '#0265dc', flexShrink: 0, marginTop: 2 }}>›</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Tab Panels ---

function OverviewTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <SectionLabel>Pipeline Opportunity Areas — Internal Sizing Frame</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bms.pipeline.opportunities.map((opp) => (
            <div key={opp.rank} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '14px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#999', width: 28, flexShrink: 0 }}>
                {String(opp.rank).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, color: '#111' }}>{opp.name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{opp.description}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: statusColor[opp.status] || '#333', marginBottom: 4 }}>
                  {opp.rangeLow}–{opp.rangeHigh}
                </div>
                <Badge
                  variant={opp.flagship ? 'negative' : opp.status === 'Active' ? 'accent' : 'neutral'}
                  size="S"
                  fillStyle={opp.flagship ? 'bold' : 'subtle'}
                >{opp.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Six Narrative Rules — All BMS-Facing Materials (May 14 / May 21 / June 2)</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
          {bms.narrativeRules.map((rule) => (
            <div key={rule.num} style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '16px 18px', display: 'flex', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0265dc', color: '#fff', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {rule.num}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#111' }}>{rule.title}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{rule.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Winning Argument</SectionLabel>
        <div style={{ background: '#0265dc', borderRadius: 8, padding: '20px 28px', boxShadow: '0 2px 8px rgba(2,101,220,0.3)' }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.7, color: '#fff', fontStyle: 'italic' }}>
            "{bms.winningArgument}"
          </p>
        </div>
      </div>

      <div>
        <SectionLabel>Pilot Path (Land-and-Expand Staircase)</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {bms.pilotPath.map((step, i) => (
            <div key={step.step} style={{ display: 'flex', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0265dc', color: '#fff', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {step.step}
                </div>
                {i < bms.pilotPath.length - 1 && <div style={{ width: 2, flex: 1, background: '#ddd', margin: '4px 0' }} />}
              </div>
              <div style={{ paddingBottom: i < bms.pilotPath.length - 1 ? 20 : 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 4, paddingTop: 5 }}>{step.name}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 4 }}>{step.detail}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Badge variant="informative" size="S" fillStyle="subtle">{step.duration}</Badge>
                  {step.cost !== 'TBD' && <Badge variant="positive" size="S" fillStyle="subtle">{step.cost}</Badge>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function StakeholdersTab() {
  const { bms: bmsStakeholders, adobe, accenture } = bms.powerMap;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div>
        <SectionLabel>BMS Power Map</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bmsStakeholders.map((s) => (
            <div key={s.name} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: '14px 18px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: dispositionColor[s.disposition] || '#999', marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                  <Badge variant="neutral" size="S" fillStyle="subtle">{s.role}</Badge>
                </div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{s.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Adobe Team — Verified Roster</SectionLabel>
        <DataTable
          headers={['Name', 'Title', 'Deal Role']}
          rows={adobe.map((s) => [<strong>{s.name}</strong>, s.title, s.role])}
        />
      </div>

      <div>
        <SectionLabel>Accenture (Strategic Partner)</SectionLabel>
        <Card>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 12, lineHeight: 1.6 }}>
            Strategy: make Adobe adoption look like MORE Accenture work, not replacement. Give Accenture billable work — retagging, data strategy, run-and-operate for CJA, metadata taxonomy cleanup.
          </div>
          <DataTable
            headers={['Name', 'Role']}
            rows={accenture.map((s) => [<strong>{s.name}</strong>, s.role])}
          />
        </Card>
      </div>
    </div>
  );
}

function EngagementTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {bms.events.map((ev) => {
        const days = daysUntil(ev.date);
        const isInternal = ev.type === 'Internal';
        return (
          <div key={ev.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <SectionLabel>{ev.name} — {formatDate(ev.date)}</SectionLabel>
              <Badge variant={isInternal ? 'notice' : 'accent'} size="S">{days}d away</Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 8 }}>FORMAT</div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{ev.format}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: '#555' }}>{ev.location}</div>
              </Card>
              {ev.bmsAttendees.length > 0 && (
                <Card>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 8 }}>BMS ATTENDEES</div>
                  {ev.bmsAttendees.map((a, i) => (
                    <div key={i} style={{ fontSize: 13, color: '#333', marginBottom: 3, lineHeight: 1.4 }}>· {a}</div>
                  ))}
                </Card>
              )}
              <Card>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 8 }}>AGENDA</div>
                {ev.agenda.map((item, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#333', marginBottom: 4, lineHeight: 1.4 }}>· {item}</div>
                ))}
              </Card>
              <Card style={{ borderLeft: '3px solid #d7373f' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#d7373f', marginBottom: 8 }}>WATCH POINTS</div>
                {ev.watchPoints.map((w, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#444', marginBottom: 6, lineHeight: 1.5 }}>› {w}</div>
                ))}
              </Card>
            </div>
          </div>
        );
      })}

      <div>
        <SectionLabel>Jonathan's Open Actions</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bms.jonathanRole.openActions.map((action, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6 }}>
              <Badge variant="accent" size="S" fillStyle="subtle">{i + 1}</Badge>
              <span style={{ fontSize: 13, lineHeight: 1.6, color: '#333' }}>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompetitiveTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionLabel>Competitive Dynamics</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bms.competitive.map((c) => (
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
          headers={['Product', 'Status', 'Gap / Note']}
          rows={bms.techLandscape.adobe.map((t) => [<strong>{t.product}</strong>, t.status, t.gap])}
        />
      </div>

      <div>
        <SectionLabel>Non-Adobe Stack</SectionLabel>
        <DataTable
          headers={['Product', 'Vendor', 'Role']}
          rows={bms.techLandscape.nonAdobe.map((t) => [
            <strong>{t.product}</strong>,
            t.vendor,
            <span>{t.role}{' '}<Badge variant={threatBadge[t.risk] || 'neutral'} size="S" fillStyle="subtle">{t.risk}</Badge></span>,
          ])}
        />
      </div>

      <div>
        <SectionLabel>Key Gaps (Wedge Opportunities)</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bms.techLandscape.gaps.map((g, i) => (
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <div>
          <SectionLabel>Internal Open Items</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bms.openItems.internal.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6 }}>
                <Badge variant="notice" size="S" fillStyle="subtle">{i + 1}</Badge>
                <span style={{ fontSize: 13, lineHeight: 1.6 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>External Open Questions</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bms.openItems.external.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6 }}>
                <Badge variant="neutral" size="S" fillStyle="subtle">{i + 1}</Badge>
                <span style={{ fontSize: 13, lineHeight: 1.6 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Assumptions</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bms.assumptions.map((a, i) => (
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

export default function BMSDashboard() {
  return (
    <Provider colorScheme="light" locale="en-US">
      <div style={{ minHeight: '100vh', background: '#e4e4e4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <Header />
        <StatCards />
        <MilestoneCards />

        <div style={{ padding: '32px 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
          <Tabs defaultSelectedKey="overview" aria-label="BMS Deal Dashboard">
            <TabList>
              <Tab id="overview">Overview</Tab>
              <Tab id="stakeholders">Stakeholders</Tab>
              <Tab id="engagement">Events & Actions</Tab>
              <Tab id="competitive">Competitive</Tab>
              <Tab id="openitems">Open Items</Tab>
            </TabList>
            <TabPanel id="overview"><div style={{ paddingTop: 28 }}><OverviewTab /></div></TabPanel>
            <TabPanel id="stakeholders"><div style={{ paddingTop: 28 }}><StakeholdersTab /></div></TabPanel>
            <TabPanel id="engagement"><div style={{ paddingTop: 28 }}><EngagementTab /></div></TabPanel>
            <TabPanel id="competitive"><div style={{ paddingTop: 28 }}><CompetitiveTab /></div></TabPanel>
            <TabPanel id="openitems"><div style={{ paddingTop: 28 }}><OpenItemsTab /></div></TabPanel>
          </Tabs>
        </div>
      </div>
    </Provider>
  );
}
