import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
} from 'recharts'

import { CircleChevronDown} from 'lucide-react'

// ── demo data (replace with API calls once backend is ready) ─────────────────

// ── REAL DATA: Stockholm Municipality ────────────────────────────────────────
// Source: BRÅ (Swedish National Council for Crime Prevention) & Statista

// Stockholm crime rate per 100,000 inhabitants (2017–2022 verified; 2023–2025 estimated)
const stockholmTrend = [
  { year: '2017',  rate: 21254 },
  { year: '2018',  rate: 21802 },
  { year: '2019',  rate: 21639 },
  { year: '2020',  rate: 21523 },
  { year: '2021',  rate: 21285 },
  { year: '2022',  rate: 19601 },
  { year: '2023*', rate: 20463 },
  { year: '2024*', rate: 20156 },
  { year: '2025*', rate: 19471 },
]

// Stockholm 2022 — 192,435 total reported crimes
// Vandalism & Theft: BRÅ/Statista verified. Others: estimated from national proportions.
const stockholmCrimeTypes = [
  { type: 'Vandalism',       count: 75000, color: '#c084fc', verified: true  },
  { type: 'Theft',           count: 46000, color: '#60a5fa', verified: true  },
  { type: 'Fraud',           count: 20000, color: '#fbbf24', verified: false },
  { type: 'Assault',         count: 17000, color: '#f87171', verified: false },
  { type: 'Drug offences',   count: 12000, color: '#34d399', verified: false },
  { type: 'Sexual offences', count:  5000, color: '#fb923c', verified: false },
  { type: 'Robbery',         count:  3000, color: '#f43f5e', verified: false },
  { type: 'Other',           count: 14435, color: '#94a3b8', verified: false },
]

// European capitals — Numbeo Crime Index 2023 (0 = safest, 100 = most dangerous)
// Source: Numbeo.com
const euCapitalsIndex = [
  { city: 'Helsinki',   index: 24.8, highlight: false },
  { city: 'Copenhagen', index: 26.5, highlight: false },
  { city: 'Vienna',     index: 26.9, highlight: false },
  { city: 'Amsterdam',  index: 32.0, highlight: false },
  { city: 'Oslo',       index: 34.1, highlight: false },
  { city: 'Berlin',     index: 43.2, highlight: false },
  { city: 'Stockholm',  index: 46.1, highlight: true  },
  { city: 'Rome',       index: 53.0, highlight: false },
  { city: 'London',     index: 53.8, highlight: false },
  { city: 'Brussels',   index: 54.6, highlight: false },
  { city: 'Paris',      index: 56.9, highlight: false },
]

// Global comparison — EU capitals + São Paulo (Brazil) + Buenos Aires (Argentina)
// Source: Numbeo Crime Index 2023
const globalCityIndex = [
  { city: 'Helsinki',     region: 'EU', index: 24.8 },
  { city: 'Copenhagen',   region: 'EU', index: 26.5 },
  { city: 'Amsterdam',    region: 'EU', index: 32.0 },
  { city: 'Berlin',       region: 'EU', index: 43.2 },
  { city: 'Stockholm',    region: 'EU', index: 46.1 },
  { city: 'Paris',        region: 'EU', index: 56.9 },
  { city: 'Buenos Aires', region: 'SA', index: 63.3 },
  { city: 'São Paulo',    region: 'SA', index: 70.5 },
]

const investigationsData = [
  { label: 'Assault',   pct: 78, color: '#f87171' },
  { label: 'Robbery',   pct: 64, color: '#fb923c' },
  { label: 'Fraud',     pct: 51, color: '#fbbf24' },
  { label: 'Vandalism', pct: 43, color: '#c084fc' },
  { label: 'Drug',      pct: 38, color: '#34d399' },
]

const topCrimesData = [
  { name: 'Theft',     count: 4371 },
  { name: 'Vandalism', count: 2248 },
  { name: 'Assault',   count: 2097 },
  { name: 'Robbery',   count: 1872 },
  { name: 'Fraud',     count: 1340 },
  { name: 'Drug',      count: 555  },
]

const zoneRiskData = [
  { zone: 'Stockholm City',   risk: 94, color: '#ef4444' },
  { zone: 'Gothenburg S.',    risk: 81, color: '#f97316' },
  { zone: 'Malmö East',       risk: 73, color: '#fbbf24' },
  { zone: 'Uppsala Central',  risk: 58, color: '#86efac' },
  { zone: 'Örebro North',     risk: 42, color: '#4ade80' },
]

const monthlyTrendData = [
  { month: 'Jan', crimes: 920  },
  { month: 'Feb', crimes: 870  },
  { month: 'Mar', crimes: 1010 },
  { month: 'Apr', crimes: 1150 },
  { month: 'May', crimes: 1080 },
  { month: 'Jun', crimes: 1230 },
  { month: 'Jul', crimes: 1400 },
  { month: 'Aug', crimes: 1350 },
  { month: 'Sep', crimes: 1190 },
  { month: 'Oct', crimes: 1280 },
  { month: 'Nov', crimes: 1100 },
  { month: 'Dec', crimes: 903  },
]

const monthChanges = [
  { month: 'Jul', pct: +14.3 },
  { month: 'Aug', pct: -3.6  },
  { month: 'Sep', pct: -11.9 },
  { month: 'Oct', pct: +7.6  },
  { month: 'Nov', pct: -14.1 },
  { month: 'Dec', pct: -17.9 },
]

const resolvedData = [
  { name: 'Resolved',   value: 67, color: '#4ade80' },
  { name: 'Unresolved', value: 33, color: '#f87171' },
]

const resolvedByType = [
  { type: 'Fraud',     rate: 82 },
  { type: 'Assault',   rate: 74 },
  { type: 'Robbery',   rate: 68 },
  { type: 'Theft',     rate: 55 },
  { type: 'Vandalism', rate: 48 },
]

// ── shared sub-components ─────────────────────────────────────────────────────

const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(2, 12, 33, 0.97)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 8,
      padding: '8px 14px',
      fontSize: 13,
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    }}>
      {label && (
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 4, fontSize: 11, letterSpacing: '0.05em' }}>
          {label}
        </p>
      )}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill || '#fff', margin: '2px 0', fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

function StatSection({ label, value, subtitle, accent, children }) {
  return (
    <div style={{
      borderRadius: 14,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderLeft: `5px solid ${accent}`,
    }}>
      <div className="flex flex-wrap gap-6 p-6 sm:p-8">
        {/* KPI panel */}
        <div className="w-full sm:w-40 shrink-0 flex flex-col justify-center gap-1.5">
          <span style={{
            color: accent,
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            {label}
          </span>
          <p className="text-white font-bold leading-tight" style={{ fontSize: 34 }}>{value}</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0 }}>{subtitle}</p>
        </div>
        {/* Visualization area */}
        <div className="flex-1" style={{ minWidth: 240 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── page ──────────────────────────────────────────────────────────────────────

function Statistics() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Understand crime through data
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
            How analytics help identify patterns, dangerous areas and public safety risk.
          </p>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginTop: 40 }} />
        </div>

        {/* HORIZONTAL TABS */}
        <section className="mb-12 flex gap-4">
            <div className="flex-1 border border-[#3b82f6] rounded-lg p-4 bg-[#3b82f6]/10 flex flex-col justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      Total Crimes Reported
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>
                      Total crimes reported to the police from 2017 to May 2026.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-white text-xs cursor-pointer font-redwing border rounded-md p-1'>VISUALIZE</button>
                </div>
            </div>
            <div className="flex-1 border border-[#f59e0b] rounded-lg p-4 bg-[#f59e0b]/10 flex flex-col justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      Active Investigation
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>
                      Active investigations currently in progress from 2017 to May 2026.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-white text-xs cursor-pointer font-redwing border rounded-md p-1'>VISUALIZE</button>
                </div>
            </div>
            <div className="flex-1 border border-[#a855f7] rounded-lg p-4 bg-[#a855f7]/10 flex flex-col justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      Common Crimes
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>
                      Most frequently reported crime types from 2017 to May 2026.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-white text-xs cursor-pointer font-redwing border rounded-md p-1'>VISUALIZE</button>
                </div>
            </div>
            <div className="flex-1 border border-[#ef4444] rounded-lg p-4 bg-[#ef4444]/10 flex flex-col justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      Highest Risk Zones
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>
                      Areas with the highest crime risk index from 2017 to May 2026.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-white text-xs cursor-pointer font-redwing border rounded-md p-1'>VISUALIZE</button>
                </div>
            </div>
            <div className="flex-1 border border-[#f97316] rounded-lg p-4 bg-[#f97316]/10 flex flex-col justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      Crime Increase
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>
                      Year-over-year crime rate change from 2017 to May 2026.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-white text-xs cursor-pointer font-redwing border rounded-md p-1'>VISUALIZE</button>
                </div>
            </div>
            <div className="flex-1 border border-[#22c55e] rounded-lg p-4 bg-[#22c55e]/10 flex flex-col gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      Resolved Cases
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6 }}>
                      Percentage of cases successfully resolved from 2017 to May 2026.
                  </p>
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-white text-xs cursor-pointer font-redwing border rounded-md p-1'>VISUALIZE</button>
                </div>
            </div>
        </section>

        {/* Stat sections */}
        <div className="flex flex-col gap-5">

          {/* ── 1. TOTAL CRIMES REPORTED ─────────────────────────────────── */}
          <StatSection
            label="Total Crimes Reported"
            value="1,439,163"
            subtitle="Sweden 2025 · BRÅ (est.)"
            accent="#3b82f6"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Source row */}
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, margin: 0 }}>
                Sources: BRÅ (Swedish National Council for Crime Prevention) · Statista · Numbeo Crime Index 2023
              </p>

              {/* Panel 1 — Yearly trend */}
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Crime Rate per 100,000 Inhabitants — Stockholm Municipality 2017–2025
                </p>
                <div style={{ height: 150 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stockholmTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="stockholmGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[18000, 23000]} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip content={<DarkTooltip />} />
                      <Area type="monotone" dataKey="rate" name="Rate / 100k" stroke="#3b82f6" strokeWidth={2.5} fill="url(#stockholmGrad)" dot={{ fill: '#3b82f6', strokeWidth: 0, r: 3 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10, marginTop: 3 }}>
                  * 2023–2025 estimated from national BRÅ trend · 2017–2022 verified
                </p>
              </div>

              {/* Panels 2 + 3 — two columns */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                {/* Panel 2 — Crime types */}
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Crime Types — Stockholm 2022
                  </p>
                  <div style={{ height: 215 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stockholmCrimeTypes} layout="vertical" margin={{ top: 0, right: 44, left: 10, bottom: 0 }} barSize={12}>
                        <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <YAxis type="category" dataKey="type" width={92} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                        <Bar dataKey="count" name="Cases" radius={[0, 4, 4, 0]}>
                          {stockholmCrimeTypes.map((entry, i) => (
                            <Cell key={i} fill={entry.color} fillOpacity={entry.verified ? 1 : 0.65} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10, marginTop: 3 }}>
                    Vandalism & Theft verified · Others estimated from national proportions
                  </p>
                </div>

                {/* Panel 3 — European capitals */}
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                    European Capitals — Numbeo Crime Index 2023
                  </p>
                  <div style={{ height: 215 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={euCapitalsIndex} layout="vertical" margin={{ top: 0, right: 44, left: 10, bottom: 0 }} barSize={12}>
                        <XAxis type="number" domain={[0, 65]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="city" width={80} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                        <Bar dataKey="index" name="Crime Index" radius={[0, 4, 4, 0]}>
                          {euCapitalsIndex.map((entry, i) => (
                            <Cell key={i} fill={entry.highlight ? '#E4B21C' : '#3b82f6'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10, marginTop: 3 }}>
                    Lower = safer · Gold = Stockholm · Scale 0–100
                  </p>
                </div>

              </div>

              {/* Panel 4 — Global comparison */}
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Global Comparison — EU Capitals vs South America (Numbeo 2023)
                </p>
                <div style={{ height: 175 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={globalCityIndex} layout="vertical" margin={{ top: 0, right: 44, left: 10, bottom: 0 }} barSize={14}>
                      <XAxis type="number" domain={[0, 80]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="city" width={90} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="index" name="Crime Index" radius={[0, 4, 4, 0]}>
                        {globalCityIndex.map((entry, i) => {
                          const fill = entry.city === 'Stockholm' ? '#E4B21C'
                                     : entry.region === 'SA'      ? '#f97316'
                                     : '#3b82f6'
                          return <Cell key={i} fill={fill} />
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
                  {[
                    { label: 'European Capital', color: '#3b82f6' },
                    { label: 'Stockholm',        color: '#E4B21C' },
                    { label: 'South America',    color: '#f97316' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color }} />
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </StatSection>
        <div className="w-full flex justify-center items-center">
            <button><CircleChevronDown className='text-white cursor-pointer transition-transform hover:scale-110 duration-300'/></button>                
        </div>
          {/* ── 2. ACTIVE INVESTIGATION ──────────────────────────────────── */}
          <StatSection
            label="Active Investigation"
            value="2,847"
            subtitle="Cases in progress"
            accent="#f59e0b"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 0' }}>
              {investigationsData.map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{item.label}</span>
                    <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{item.pct}%</span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 999,
                    height: 8,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${item.pct}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${item.color}99, ${item.color})`,
                      borderRadius: 999,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </StatSection>
            <div className="w-full flex justify-center items-center">
                <button><CircleChevronDown className='text-white cursor-pointer transition-transform hover:scale-110 duration-300'/></button>                
            </div>

          {/* ── 3. COMMON CRIMES ─────────────────────────────────────────── */}
          <StatSection
            label="Common Crimes"
            value="Theft"
            subtitle="Most reported type"
            accent="#a855f7"
          >
            <div style={{ height: 210 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topCrimesData}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                  barSize={28}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<DarkTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Bar dataKey="count" name="Reports" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </StatSection>
            <div className="w-full flex justify-center items-center">
                <button><CircleChevronDown className='text-white cursor-pointer transition-transform hover:scale-110 duration-300'/></button>                
            </div>

          {/* ── 4. HIGHEST RISK ZONE ─────────────────────────────────────── */}
          <StatSection
            label="Highest Risk Zone"
            value="Stockholm"
            subtitle="City — risk index 94 / 100"
            accent="#ef4444"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 0' }}>
              {zoneRiskData.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 13,
                    minWidth: 140,
                  }}>
                    {item.zone}
                  </span>
                  <div style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 999,
                    height: 10,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${item.risk}%`,
                      height: '100%',
                      background: item.color,
                      borderRadius: 999,
                    }} />
                  </div>
                  <span style={{
                    color: item.color,
                    fontSize: 13,
                    fontWeight: 700,
                    minWidth: 28,
                    textAlign: 'right',
                  }}>
                    {item.risk}
                  </span>
                </div>
              ))}
            </div>
          </StatSection>
            <div className="w-full flex justify-center items-center">
                <button><CircleChevronDown className='text-[var(-color--secondary)] cursor-pointer transition-transform hover:scale-110 duration-300'/></button>                
            </div>

          {/* ── 5. CRIME INCREASE ────────────────────────────────────────── */}
          <StatSection
            label="Crime Increase"
            value="+8.3%"
            subtitle="Year-over-year (2025)"
            accent="#f97316"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
              {/* Monthly change badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {monthChanges.map((item, i) => {
                  const up = item.pct > 0
                  return (
                    <div key={i} style={{
                      background: up ? 'rgba(249,115,22,0.12)' : 'rgba(74,222,128,0.12)',
                      border: `1px solid ${up ? 'rgba(249,115,22,0.3)' : 'rgba(74,222,128,0.3)'}`,
                      borderRadius: 8,
                      padding: '6px 12px',
                      textAlign: 'center',
                      minWidth: 56,
                    }}>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginBottom: 3 }}>
                        {item.month}
                      </div>
                      <div style={{ color: up ? '#fb923c' : '#4ade80', fontWeight: 700, fontSize: 14 }}>
                        {up ? '+' : ''}{item.pct}%
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Area chart */}
              <div style={{ flex: 1, minWidth: 220, height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyTrendData}
                    margin={{ top: 5, right: 5, left: -30, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="crimeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#f97316" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<DarkTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="crimes"
                      name="Crimes"
                      stroke="#f97316"
                      strokeWidth={2.5}
                      fill="url(#crimeGradient)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </StatSection>
            <div className="w-full flex justify-center items-center">
                <button><CircleChevronDown className='text-white cursor-pointer transition-transform hover:scale-110 duration-300'/></button>                
            </div>

          {/* ── 6. RESOLVED CASES ────────────────────────────────────────── */}
          <StatSection
            label="Resolved Cases"
            value="67%"
            subtitle="Overall resolution rate"
            accent="#22c55e"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
              {/* Donut */}
              <div style={{ width: 180, height: 180, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resolvedData}
                      cx="50%" cy="50%"
                      innerRadius={48} outerRadius={74}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {resolvedData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<DarkTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Count breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 120 }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.15em', marginBottom: 4 }}>
                    RESOLVED
                  </div>
                  <div style={{ color: '#4ade80', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>8,363</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 3 }}>of 12,483 total</div>
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.15em', marginBottom: 4 }}>
                    UNRESOLVED
                  </div>
                  <div style={{ color: '#f87171', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>4,120</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 3 }}>still open</div>
                </div>
              </div>
              {/* Resolution rate by crime type */}
              <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {resolvedByType.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, minWidth: 65 }}>
                      {item.type}
                    </span>
                    <div style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: 999,
                      height: 6,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${item.rate}%`,
                        height: '100%',
                        background: '#22c55e',
                        borderRadius: 999,
                      }} />
                    </div>
                    <span style={{ color: '#4ade80', fontSize: 12, fontWeight: 700, minWidth: 30, textAlign: 'right' }}>
                      {item.rate}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </StatSection>
            <div className="w-full flex justify-center items-center">
                <button><CircleChevronDown className='text-white cursor-pointer transition-transform hover:scale-110 duration-300'/></button>                
            </div>

        </div>
      </div>
    </div>
  )
}

export default Statistics
