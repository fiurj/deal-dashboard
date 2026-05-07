import {
  Provider,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Badge,
  StatusLight,
  Meter,
  TableView,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
} from '@react-spectrum/s2';
import { bms } from '../data/bms.js';

const confidenceVariant = (c) =>
  c === 'high' ? 'positive' : c === 'medium' ? 'notice' : 'neutral';

const threatVariant = (t) =>
  t === 'high' ? 'negative' : t === 'medium' ? 'notice' : 'neutral';

function SectionHeading({ children }) {
  return (
    <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: 'var(--spectrum-gray-900)' }}>
      {children}
    </h2>
  );
}

function OverviewTab() {
  const { posture } = bms;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {[
          { label: 'Seed Target', value: posture.closeTargetSeed },
          { label: 'Transformational Target', value: posture.closeTargetTransformational },
          { label: 'Current Adobe Spend', value: posture.currentAdobeSpend },
          { label: 'Decision Center', value: posture.decisionCenter },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--spectrum-gray-75)', borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--spectrum-gray-600)', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--spectrum-gray-900)' }}>{value}</div>
          </div>
        ))}
      </div>

      <div>
        <SectionHeading>Pipeline Progress</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Meter label="Seed deal ($5–6M target)" value={40} variant="informative" size="L" />
          <Meter label="Transformational deal ($20–30M target)" value={15} variant="notice" size="L" />
        </div>
      </div>

      <div>
        <SectionHeading>Next Milestone</SectionHeading>
        <div style={{ background: 'var(--spectrum-blue-100)', borderRadius: 8, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Badge variant="accent" size="L">June 2, 2026</Badge>
          <span style={{ fontSize: 15 }}>Adobe Day — BMS Princeton campus</span>
        </div>
      </div>

      <div>
        <SectionHeading>Deal Model</SectionHeading>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--spectrum-gray-800)', lineHeight: 1.6 }}>{posture.dealModel}</p>
      </div>

      <div>
        <SectionHeading>Tech Win Status</SectionHeading>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--spectrum-gray-800)', lineHeight: 1.6 }}>{posture.techWin}</p>
      </div>
    </div>
  );
}

function PowerMapTab() {
  const { bms: bmsStakeholders, adobe, accenture } = bms.powerMap;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionHeading>BMS Stakeholders</SectionHeading>
        <TableView aria-label="BMS stakeholders" density="spacious" isQuiet>
          <TableHeader>
            <Column isRowHeader width={180}>Name</Column>
            <Column width={260}>Title</Column>
            <Column width={200}>Role</Column>
            <Column>Notes</Column>
          </TableHeader>
          <TableBody>
            {bmsStakeholders.map((s) => (
              <Row key={s.name} id={s.name}>
                <Cell>{s.name}</Cell>
                <Cell>{s.title}</Cell>
                <Cell><Badge variant={s.role.includes('Buyer') || s.role.includes('Authority') ? 'accent' : s.role.includes('Skeptic') ? 'negative' : 'informative'} fillStyle="subtle">{s.role}</Badge></Cell>
                <Cell>{s.notes}</Cell>
              </Row>
            ))}
          </TableBody>
        </TableView>
      </div>

      <div>
        <SectionHeading>Adobe Team</SectionHeading>
        <TableView aria-label="Adobe team" density="regular" isQuiet>
          <TableHeader>
            <Column isRowHeader width={180}>Name</Column>
            <Column width={260}>Title</Column>
            <Column>Deal Role</Column>
          </TableHeader>
          <TableBody>
            {adobe.map((s) => (
              <Row key={s.name} id={s.name}>
                <Cell>{s.name}</Cell>
                <Cell>{s.title}</Cell>
                <Cell>{s.role}</Cell>
              </Row>
            ))}
          </TableBody>
        </TableView>
      </div>

      <div>
        <SectionHeading>Accenture (Partner)</SectionHeading>
        <TableView aria-label="Accenture team" density="regular" isQuiet>
          <TableHeader>
            <Column isRowHeader width={180}>Name</Column>
            <Column>Role</Column>
          </TableHeader>
          <TableBody>
            {accenture.map((s) => (
              <Row key={s.name} id={s.name}>
                <Cell>{s.name}</Cell>
                <Cell>{s.role}</Cell>
              </Row>
            ))}
          </TableBody>
        </TableView>
      </div>
    </div>
  );
}

function PainToPlatformTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeading>Pain-to-Platform Mapping</SectionHeading>
      <TableView aria-label="Pain to platform mapping" density="spacious" isQuiet>
        <TableHeader>
          <Column isRowHeader>BMS Pain</Column>
          <Column width={280}>Platform Answer</Column>
          <Column width={120}>Confidence</Column>
        </TableHeader>
        <TableBody>
          {bms.painToPlatform.map((row, i) => (
            <Row key={i} id={String(i)}>
              <Cell>{row.pain}</Cell>
              <Cell>{row.platform}</Cell>
              <Cell>
                <Badge variant={confidenceVariant(row.confidence)} fillStyle="subtle">
                  {row.confidence}
                </Badge>
              </Cell>
            </Row>
          ))}
        </TableBody>
      </TableView>

      <div>
        <SectionHeading>Whitespace Prioritization</SectionHeading>
        {[
          { label: 'Tier 1 — Immediate (seed deal, 2026)', items: bms.whitespace.tier1, variant: 'positive' },
          { label: 'Tier 2 — Near-term (2026 expansion)', items: bms.whitespace.tier2, variant: 'informative' },
          { label: 'Tier 3 — Transformational (Q1 2027)', items: bms.whitespace.tier3, variant: 'neutral' },
        ].map(({ label, items, variant }) => (
          <div key={label} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Badge variant={variant} size="M">{label}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((item) => (
                <div key={item.item} style={{ background: 'var(--spectrum-gray-75)', borderRadius: 6, padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.item}</div>
                  <div style={{ fontSize: 13, color: 'var(--spectrum-gray-700)', lineHeight: 1.5 }}>{item.rationale}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitiveTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeading>Competitive Dynamics</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {bms.competitive.map((c) => (
          <div key={c.competitor} style={{ background: 'var(--spectrum-gray-75)', borderRadius: 8, padding: '16px 20px', borderLeft: `4px solid var(--spectrum-${c.threat === 'high' ? 'red' : c.threat === 'medium' ? 'orange' : 'gray'}-600)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{c.competitor}</span>
              <StatusLight variant={threatVariant(c.threat)}>{c.threat} threat</StatusLight>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--spectrum-gray-800)', lineHeight: 1.6 }}>{c.notes}</p>
          </div>
        ))}
      </div>

      <div>
        <SectionHeading>Tech Landscape</SectionHeading>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14, color: 'var(--spectrum-gray-700)' }}>Incumbent Adobe</div>
          <TableView aria-label="Adobe tech" density="compact" isQuiet>
            <TableHeader>
              <Column isRowHeader width={180}>Product</Column>
              <Column width={200}>Status</Column>
              <Column>Gap</Column>
            </TableHeader>
            <TableBody>
              {bms.techLandscape.adobe.map((t) => (
                <Row key={t.product} id={t.product}>
                  <Cell>{t.product}</Cell>
                  <Cell>{t.status}</Cell>
                  <Cell>{t.gap}</Cell>
                </Row>
              ))}
            </TableBody>
          </TableView>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14, color: 'var(--spectrum-gray-700)' }}>Non-Adobe</div>
          <TableView aria-label="Non-Adobe tech" density="compact" isQuiet>
            <TableHeader>
              <Column isRowHeader width={220}>Product</Column>
              <Column width={140}>Vendor</Column>
              <Column>Role</Column>
            </TableHeader>
            <TableBody>
              {bms.techLandscape.nonAdobe.map((t) => (
                <Row key={t.product} id={t.product}>
                  <Cell>{t.product}</Cell>
                  <Cell>{t.vendor}</Cell>
                  <Cell>{t.role}</Cell>
                </Row>
              ))}
            </TableBody>
          </TableView>
        </div>
      </div>

      <div>
        <SectionHeading>Gaps</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bms.techLandscape.gaps.map((g, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'var(--spectrum-negative-background-color-default, #fff4f4)', borderRadius: 6 }}>
              <span style={{ color: 'var(--spectrum-negative-color-900)', fontSize: 16, lineHeight: 1 }}>●</span>
              <span style={{ fontSize: 14, lineHeight: 1.5 }}>{g}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OpenQuestionsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <SectionHeading>Open Questions</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bms.openQuestions.map((q, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: 'var(--spectrum-gray-75)', borderRadius: 6 }}>
              <Badge variant="notice" size="S">{i + 1}</Badge>
              <span style={{ fontSize: 14, lineHeight: 1.6 }}>{q}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading>Assumptions</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bms.assumptions.map((a, i) => (
            <div key={i} style={{ padding: '12px 16px', background: 'var(--spectrum-gray-75)', borderRadius: 6, borderLeft: '3px solid var(--spectrum-informative-color-900, #0265dc)' }}>
              <span style={{ fontSize: 14, lineHeight: 1.6 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BMSDashboard() {
  return (
    <Provider colorScheme="light" locale="en-US">
      <div style={{ minHeight: '100vh', background: 'var(--spectrum-gray-50)', fontFamily: 'adobe-clean, adobe-clean-serif, Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>

        {/* Header */}
        <div style={{ background: '#1e1e1e', color: '#fff', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>Deal Dashboard</div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>Bristol Myers Squibb</h1>
            <div style={{ marginTop: 6, fontSize: 13, color: '#aaa' }}>Insights Rewired — Platform SC Reference | Updated {bms.lastUpdated}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Badge variant="notice" size="L">Post-RFI Evaluation</Badge>
            <Badge variant="negative" size="L" fillStyle="outline">Adobe Confidential</Badge>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 40px', maxWidth: 1200, margin: '0 auto' }}>
          <Tabs defaultSelectedKey="overview" density="regular">
            <TabList>
              <Tab id="overview">Overview</Tab>
              <Tab id="powermap">Power Map</Tab>
              <Tab id="pain">Pain-to-Platform</Tab>
              <Tab id="competitive">Competitive</Tab>
              <Tab id="questions">Open Questions</Tab>
            </TabList>
            <TabPanel id="overview" UNSAFE_style={{ paddingTop: 28 }}><OverviewTab /></TabPanel>
            <TabPanel id="powermap" UNSAFE_style={{ paddingTop: 28 }}><PowerMapTab /></TabPanel>
            <TabPanel id="pain" UNSAFE_style={{ paddingTop: 28 }}><PainToPlatformTab /></TabPanel>
            <TabPanel id="competitive" UNSAFE_style={{ paddingTop: 28 }}><CompetitiveTab /></TabPanel>
            <TabPanel id="questions" UNSAFE_style={{ paddingTop: 28 }}><OpenQuestionsTab /></TabPanel>
          </Tabs>
        </div>
      </div>
    </Provider>
  );
}
