import { useState } from 'react';
import BMSDashboard from './components/BMSDashboard.jsx';
import BCBSMIDashboard from './components/BCBSMIDashboard.jsx';
import BCBSSCDashboard from './components/BCBSSCDashboard.jsx';

const deals = [
  { id: 'bms', label: 'Bristol-Myers Squibb', sub: 'Stage 3 · $10M+' },
  { id: 'bcbsmi', label: 'BCBS Michigan', sub: 'Stage 3 · $1.776M' },
  { id: 'bcbssc', label: 'BCBS South Carolina', sub: 'Stage 3 · $653K' },
];

export default function App() {
  const [active, setActive] = useState('bms');

  return (
    <div>
      <div style={{
        background: '#000',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        borderBottom: '1px solid #222',
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', paddingRight: 24, borderRight: '1px solid #222', marginRight: 24, whiteSpace: 'nowrap' }}>
          Deal Dashboards
        </div>
        {deals.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '14px 20px',
              borderBottom: active === d.id ? '2px solid #0265dc' : '2px solid transparent',
              marginBottom: -1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 2,
              transition: 'border-color 0.15s',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: active === d.id ? 700 : 500, color: active === d.id ? '#fff' : '#888' }}>
              {d.label}
            </span>
            <span style={{ fontSize: 11, color: active === d.id ? '#0265dc' : '#555' }}>{d.sub}</span>
          </button>
        ))}
      </div>

      {active === 'bms' && <BMSDashboard />}
      {active === 'bcbsmi' && <BCBSMIDashboard />}
      {active === 'bcbssc' && <BCBSSCDashboard />}
    </div>
  );
}
