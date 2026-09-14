import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Shield,
    MapPin,
    TrendingUp,
    BookmarkCheck,
    BarChart2,
    History,
    AlertTriangle,
    ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

// --- Demo data (replace with real API data later) ---
const recentActivity = [
    { id: 1, type: 'Theft', location: 'Stockholm, Södermalm', time: '2h ago', severity: 2 },
    { id: 2, type: 'Vandalism', location: 'Göteborg, Hisingen', time: '4h ago', severity: 1 },
    { id: 3, type: 'Assault', location: 'Malmö, Rosengård', time: '6h ago', severity: 4 },
    { id: 4, type: 'Burglary', location: 'Uppsala, Centrum', time: '8h ago', severity: 3 },
    { id: 5, type: 'Drug Offence', location: 'Stockholm, Rinkeby', time: '11h ago', severity: 3 },
    { id: 6, type: 'Fraud', location: 'Linköping, Centrum', time: '14h ago', severity: 2 },
];

const quickLinks = [
    {
        label: 'Zones',
        path: '/dashboard/zones',
        icon: MapPin,
        description: 'Explore crime hotspots and geographic zones',
    },
    {
        label: 'Statistics',
        path: '/dashboard/statistics',
        icon: BarChart2,
        description: 'Charts, trends, and period comparisons',
    },
    {
        label: 'Crime History',
        path: '/dashboard/crime-history',
        icon: History,
        description: 'Browse and filter historical records',
    },
];

// --- Helpers ---
function severityMeta(s) {
    if (s <= 1) return { label: 'Low', classes: 'bg-emerald-500/15 text-emerald-400' };
    if (s <= 2) return { label: 'Medium', classes: 'bg-yellow-500/15 text-yellow-400' };
    if (s <= 3) return { label: 'High', classes: 'bg-orange-500/15 text-orange-400' };
    return { label: 'Critical', classes: 'bg-red-500/15 text-red-400' };
}

function StatCard({ label, value, description, icon: Icon }) {
    return (
        <div className="rounded-xl border border-white/8 bg-white/4 p-5 hover:border-white/15 transition-colors">
            <div className="flex items-start justify-between mb-3">
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-medium">{label}</p>
                <Icon size={17} strokeWidth={1.6} className="text-[var(--color-secondary)] opacity-60 flex-shrink-0" />
            </div>
            <p className="text-3xl font-bold text-white mb-1.5">{value}</p>
            <p className="text-xs text-white/35">{description}</p>
        </div>
    );
}

// --- Component ---
export default function Dashboard() {
    const { user, role } = useAuth();
    const savedCrimes = useSelector((state) => state.saved.savedCrimes);

    const displayName = user?.username || user?.email?.split('@')[0] || 'User';
    const today = new Date().toLocaleDateString('en-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-full bg-[#030f1e] text-white">
            <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

                {/* ── Welcome ── */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-redwing text-white tracking-wide leading-tight">
                            Welcome back,{' '}
                            <span className="text-[var(--color-secondary)]">{displayName}</span>
                        </h1>
                        <p className="text-white/35 text-sm mt-1.5">{today}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[var(--color-secondary)]/25 text-[var(--color-secondary)] bg-[var(--color-secondary)]/8 capitalize self-start whitespace-nowrap">
                        <Shield size={11} strokeWidth={2} />
                        {role || 'analyst'}
                    </span>
                </div>

                {/* ── KPI cards ── */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard
                        label="Crimes This Month"
                        value="2,847"
                        description="Reported across all zones"
                        icon={Shield}
                    />
                    <StatCard
                        label="Active Zones"
                        value="12"
                        description="Regions with active data feed"
                        icon={MapPin}
                    />
                    <StatCard
                        label="Monthly Trend"
                        value="↑ 3.2%"
                        description="vs previous month"
                        icon={TrendingUp}
                    />
                    <StatCard
                        label="Saved Crimes"
                        value={savedCrimes.length}
                        description="Bookmarked for review"
                        icon={BookmarkCheck}
                    />
                </div>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Placeholder for Unfinished Profile Completion*/}
                    {/*Fetches unfinished profile completion data */}
                    <div className='lg:col-span-3 rounded-xl border border-white/8 bg-white/4 p-6'>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Profile Completion</h2>
                        <p className="text-sm font-redwing text-white/70 mt-2">Your Profile is incomplete
                            <span className="text-xs block mt-1 text-[var(--color-secondary)] hover:underline cursor-pointer">Complete your profile to Report Crimes and Watch neighborhood</span>
                        </p>
                    </div>
                    {/* Recent activity */}
                    <div className="lg:col-span-2 rounded-xl border border-white/8 bg-white/4 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                                Recent Activity
                            </h2>
                            <span className="text-[11px] text-white/25 italic">Demo data</span>
                        </div>

                        <ul className="divide-y divide-white/5">
                            {recentActivity.map((item) => {
                                const meta = severityMeta(item.severity);
                                return (
                                    <li
                                        key={item.id}
                                        className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{item.type}</p>
                                            <p className="text-xs text-white/35 truncate mt-0.5">{item.location}</p>
                                        </div>
                                        <span
                                            className={`text-[11px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${meta.classes}`}
                                        >
                                            {meta.label}
                                        </span>
                                        <span className="text-[11px] text-white/25 whitespace-nowrap flex-shrink-0">
                                            {item.time}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <Link
                            to="/dashboard/crime-history"
                            className="mt-5 inline-flex items-center gap-1.5 text-xs text-[var(--color-secondary)] hover:underline"
                        >
                            View full history
                            <ArrowRight size={12} />
                        </Link>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">

                        {/* Quick access */}
                        <div className="rounded-xl border border-white/8 bg-white/4 p-6">
                            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
                                Quick Access
                            </h2>
                            <ul className="space-y-1">
                                {quickLinks.map(({ label, path, icon: Icon, description }) => (
                                    <li key={path}>
                                        <Link
                                            to={path}
                                            className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/6 transition-colors group"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center">
                                                <Icon
                                                    size={15}
                                                    strokeWidth={1.8}
                                                    className="text-[var(--color-secondary)]"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-white group-hover:text-[var(--color-secondary)] transition-colors">
                                                    {label}
                                                </p>
                                                <p className="text-xs text-white/35 leading-snug">{description}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Alert notice */}
                        <div className="rounded-xl border border-[var(--color-secondary)]/15 bg-[var(--color-secondary)]/5 p-4 flex gap-3">
                            <AlertTriangle
                                size={16}
                                strokeWidth={1.8}
                                className="text-[var(--color-secondary)] flex-shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-white/50 leading-relaxed">
                                All data is sourced from official Swedish{' '}
                                <span className="text-white/70">BRÅ</span> public datasets. Only
                                aggregated statistics are shown — no individual records are ever
                                exposed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
