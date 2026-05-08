import { Provider, Tabs, TabList, Tab, TabPanel, Badge, StatusLight } from '@react-spectrum/s2';
import { bcbssc } from '../data/bcbssc.js';

// --- Utilities ---

function daysUntil(dateStr) {
  const today = new Date('2026-05-08');
  const target = new Date(dateStr);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const dispositionColor = {
  positive: '#12805c',
  neutral:  '#6e6e6e',
  skeptic:  '#d7373f',
  unknown:  '#999',
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
  const s = bcbssc.status;
  return (
    <div style={{ background: '#111', color: '#fff', padding: '22px 40px', borderBottom: '3px solid #0265dc' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <Badge variant="accent" size="S">Stage {s.stage} — {s.stageLabel}</Badge>
            <Badge variant="notice" size="S">{s.adjCommit}</Badge>
            <Badge variant="informative" size="S" fillStyle="subtle">Warm Restart</Badge>
            <Badge variant="negative" size="S" fillStyle="outline">Adobe Confidential</Badge>
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Blue Cross Blue Shield of South Carolina
          </h1>
          <div style={{ fontSize: 13, color: '#999' }}>
            {bcbssc.type} &middot; {bcbssc.hq} &middot; {s.dr} &middot; TD: {s.td} &middot; ISC: {s.isc}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#666' }}>
          <div style={{ fontWeight: 700, color: '#0265dc', fontSize: 14, marginBottom: 4 }}>"{s.strategicFrame}"</div>
          <div style={{ fontWeight: 600, color: '#aaa' }}>Last Updated: {bcbssc.lastUpdated}</div>
          <div style={{ marginTop: 4, color: '#555' }}>AD: {s.ad}</div>
        </div>
      </div>
    </div>
  );
}

// --- Stat Cards ---

function StatCards() {
  const nextEvent = bcbssc.events.find(e => daysUntil(e.date) >= 0);
  const nextDays = nextEvent ? daysUntil(nextEvent.date) : null;
  return (
    <div style={{ background: '#e8e8e8', borderBottom: '2px solid #ccc', padding: '20px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 1200, margin: '0 auto' }}>
        {[
          { label: 'Pipeline GNRR', value: bcbssc.status.gnrr, sub: `Target close ${bcbssc.status.close} · ${bcbssc.status.dr}` },
          { label: 'Expansion Motion', value: 'Campaign → AJO', sub: bcbssc.status.motion },
          { label: 'Existing Footprint', value: 'AEM + AA + Campaign', sub: 'Platform consolidation play — up to 5 vendor retirements' },
          { label: 'Key Risk', value: bcbssc.status.techRisk, sub: bcbssc.status.techRiskNote },
          { label: 'Next Session', value: nextDays !== null ? `${nextDays}d` : '—', sub: nextEvent ? nextEvent.name : '' },
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

// --- Milestone Cards ---

function MilestoneCards() {
  return (
    <div style={{ background: '#e8e8e8', padding: '0 40px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14, maxWidth: 1200, margin: '0 auto' }}>
        {bcbssc.events.map((ev) => {
          const days = daysUntil(ev.date);
          const isInternal = ev.type === 'Internal';
          const isUrgent = days >= 0 && days <= 7;
          const borderColor = isInternal ? '#f0c33c' : isUrgent ? '#d7373f' : '#0265dc';
          const dayColor = isInternal ? '#b8860b' : isUrgent ? '#d7373f' : '#0265dc';
          return (
            <div key={ev.id} style={{
              background: '#fff',
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              padding: '16px 20px',
              borderTop: `4px solid ${borderColor}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <Badge variant={isInternal ? 'notice' : isUrgent ? 'negative' : 'accent'} size="S" fillStyle="subtle">{ev.type}</Badge>
                <div style={{ fontSize: 36, fontWeight: 900, color: dayColor, lineHeight: 1 }}>
                  {days < 0 ? '—' : days}<span style={{ fontSize: 13, fontWeight: 600, color: '#888', marginLeft: 4 }}>days</span>
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2, color: '#111' }}>{ev.name}</div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>{ev.format} &middot; {formatDate(ev.date)}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {ev.agenda.slice(0, 3).map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#555', lineHeight: 1.4 }}>
                    <span style={{ color: dayColor, flexShrink: 0, marginTop: 2 }}>›</span>
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
        <SectionLabel>Deal Character</SectionLabel>
        <div style={{ background: '#0265dc', borderRadius: 8, padding: '20px 28px', boxShadow: '0 2px 8px rgba(2,101,220,0.3)' }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.7, color: '#fff', fontStyle: 'italic' }}>
            "{bcbssc.status.dealCharacter}"
          </p>
        </div>
      </div>

      <div>
        <SectionLabel>Positioning Rules — All Customer Sessions</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
          {bcbssc.positioningRules.map((rule, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '16px 18px', display: 'flex', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0265dc', color: '#fff', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#111' }}>{rule.rule}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{rule.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Platform Consolidation — Vendor Retirement Path</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bcbssc.consolidationPath.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: '14px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#d7373f', textDecoration: 'line-through', opacity: 0.7 }}>{step.retiring}</span>
                  <span style={{ color: '#999', fontSize: 18 }}>→</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#0265dc' }}>{step.replacement}</span>
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>{step.timeline}</div>
              </div>
              <Badge
                variant={step.status.includes('Progress') ? 'accent' : step.status.includes('Planned') ? 'positive' : 'neutral'}
                size="S"
                fillStyle="subtle"
              >{step.status}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Whitespace — Expansion Roadmap</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {bcbssc.whitespace.map((tier) => (
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

      <div>
        <SectionLabel>Member Engagement Context (2024 Data)</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {bcbssc.digitalContext.outcomes2023.map((stat, i) => (
            <Card key={i}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0265dc', marginBottom: 4 }}>{stat.split(' ').slice(0, 2).join(' ')}</div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{stat}</div>
            </Card>
          ))}
        </div>
        <Card style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Active Campaigns</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>{bcbssc.digitalContext.activeCampaigns}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>NBA Panel</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>{bcbssc.digitalContext.nbaPanel}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Active Channels</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>{bcbssc.digitalContext.channels}</div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}

function PowerMapTab() {
  const { bcbssc: contacts, adobe } = bcbssc.powerMap;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      <div>
        <SectionLabel>BCBS SC — Stakeholder Map</SectionLabel>
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

function EngagementTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {bcbssc.events.map((ev) => {
        const days = daysUntil(ev.date);
        const isInternal = ev.type === 'Internal';
        const isUrgent = days >= 0 && days <= 7;
        const accentColor = isInternal ? '#b8860b' : isUrgent ? '#d7373f' : '#0265dc';
        return (
          <div key={ev.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
              <SectionLabel>{ev.name} — {formatDate(ev.date)}</SectionLabel>
              <Badge variant={isInternal ? 'notice' : isUrgent ? 'negative' : 'accent'} size="S">
                {days < 0 ? 'Past' : `${days}d away`}
              </Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 8 }}>FORMAT</div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{ev.format}</div>
                {ev.location && <div style={{ fontSize: 13, lineHeight: 1.6, color: '#555' }}>{ev.location}</div>}
              </Card>
              {ev.bmsAttendees && ev.bmsAttendees.length > 0 && (
                <Card>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 8 }}>EXPECTED ATTENDEES</div>
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
              <Card style={{ borderLeft: `3px solid ${accentColor}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, marginBottom: 8 }}>WATCH POINTS</div>
                {ev.watchPoints.map((w, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#444', marginBottom: 6, lineHeight: 1.5 }}>› {w}</div>
                ))}
              </Card>
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
        <SectionLabel>Incumbent Adobe Footprint</SectionLabel>
        <DataTable
          headers={['Product', 'Status', 'Gap / Risk']}
          rows={bcbssc.techLandscape.adobe.map((t) => [<strong>{t.product}</strong>, t.status, t.gap])}
        />
      </div>

      <div>
        <SectionLabel>Non-Adobe Stack — Retirement Targets & Partners</SectionLabel>
        <DataTable
          headers={['Product', 'Vendor', 'Role / Risk']}
          rows={bcbssc.techLandscape.nonAdobe.map((t) => [
            <strong>{t.product}</strong>,
            t.vendor,
            <span>{t.role}{' '}<Badge variant={threatBadge[t.risk] || 'neutral'} size="S" fillStyle="subtle">{t.risk}</Badge></span>,
          ])}
        />
      </div>

      <div>
        <SectionLabel>Key Gaps (Wedge Opportunities)</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bcbssc.techLandscape.gaps.map((g, i) => (
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
          {bcbssc.openItems.map((q, i) => (
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
          {bcbssc.assumptions.map((a, i) => (
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

export default function BCBSSCDashboard() {
  return (
    <Provider colorScheme="light" locale="en-US">
      <div style={{ minHeight: '100vh', background: '#e4e4e4', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <Header />
        <StatCards />
        <MilestoneCards />

        <div style={{ padding: '32px 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
          <Tabs defaultSelectedKey="overview" aria-label="BCBS South Carolina Deal Dashboard">
            <TabList>
              <Tab id="overview">Overview</Tab>
              <Tab id="powermap">Power Map</Tab>
              <Tab id="engagement">Engagement</Tab>
              <Tab id="competitive">Tech Stack</Tab>
              <Tab id="openitems">Open Items</Tab>
            </TabList>
            <TabPanel id="overview"><div style={{ paddingTop: 28 }}><OverviewTab /></div></TabPanel>
            <TabPanel id="powermap"><div style={{ paddingTop: 28 }}><PowerMapTab /></div></TabPanel>
            <TabPanel id="engagement"><div style={{ paddingTop: 28 }}><EngagementTab /></div></TabPanel>
            <TabPanel id="competitive"><div style={{ paddingTop: 28 }}><CompetitiveTab /></div></TabPanel>
            <TabPanel id="openitems"><div style={{ paddingTop: 28 }}><OpenItemsTab /></div></TabPanel>
          </Tabs>
        </div>
      </div>
    </Provider>
  );
}
