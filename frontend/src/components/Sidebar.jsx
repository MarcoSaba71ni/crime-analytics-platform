import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import {
    LayoutDashboard,
    MapPin,
    BarChart2,
    History,
    User,
    LogOut,
    FilePlus,
    ChevronLeft,
    ChevronRight,
    X,
    Shield,
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', exact: true },
    { label: 'Zones', icon: MapPin, path: '/dashboard/zones' },
    { label: 'Statistics', icon: BarChart2, path: '/dashboard/statistics' },
    { label: 'Crime History', icon: History, path: '/dashboard/crime-history' },
];

const reporterNavItems = [
    { label: 'New Report', icon: FilePlus, path: '/dashboard/report' },
];

function NavItem({ label, icon: Icon, path, collapsed, onClick, isActive }) {
    return (
        <Link
            to={path}
            onClick={onClick}
            title={collapsed ? label : undefined}
            className={[
                'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 border-l-2',
                collapsed ? 'justify-center' : '',
                isActive
                    ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'
                    : 'border-transparent text-white/50 hover:text-white hover:bg-white/8',
            ].join(' ')}
        >
            <Icon size={18} strokeWidth={1.8} className="flex-shrink-0" />
            {!collapsed && (
                <span className="text-sm font-medium tracking-wide whitespace-nowrap">{label}</span>
            )}
        </Link>
    );
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
    const { user, logout, role } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isReporter = role?.toLowerCase() === 'crime_reporter';
    const items = isReporter ? [...navItems, ...reporterNavItems] : navItems;

    const displayName = user?.username || user?.email?.split('@')[0] || 'User';

    function isActive(path, exact = false) {
        if (exact) return location.pathname === path;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    }

    async function handleLogout() {
        await logout();
        navigate('/', { replace: true });
    }

    return (
        <aside
            className={[
                'fixed inset-y-0 left-0 z-30 flex flex-col',
                'bg-[var(--color-primary)] border-r border-white/8',
                'transition-all duration-300 ease-in-out',
                collapsed ? 'w-16' : 'w-64',
                mobileOpen ? 'translate-x-0' : '-translate-x-full',
                'md:translate-x-0',
            ].join(' ')}
        >
            {/* Brand + toggle */}
            <div
                className={[
                    'flex items-center h-16 px-3 border-b border-white/8 flex-shrink-0',
                    collapsed ? 'justify-center' : 'justify-between',
                ].join(' ')}
            >
                {!collapsed && (
                    <Link
                        to="/dashboard"
                        className="font-redwing line-through text-2xl text-white tracking-wider hover:text-[var(--color-secondary)] transition-colors"
                    >
                        SS
                    </Link>
                )}

                {/* Desktop collapse toggle */}
                <button
                    type="button"
                    onClick={onToggle}
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                {/* Mobile close button */}
                <button
                    type="button"
                    onClick={onMobileClose}
                    className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                {items.map((item) => (
                    <NavItem
                        key={item.path}
                        {...item}
                        collapsed={collapsed}
                        onClick={onMobileClose}
                        isActive={isActive(item.path, item.exact)}
                    />
                ))}
            </nav>

            {/* User section */}
            <div className="border-t border-white/8 px-2 py-3 space-y-0.5 flex-shrink-0">
                {/* Profile link */}
                <Link
                    to="/profile"
                    onClick={onMobileClose}
                    title={collapsed ? 'Profile' : undefined}
                    className={[
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 border-l-2 w-full',
                        collapsed ? 'justify-center' : '',
                        isActive('/profile', true)
                            ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'
                            : 'border-transparent text-white/50 hover:text-white hover:bg-white/8',
                    ].join(' ')}
                >
                    <User size={18} strokeWidth={1.8} className="flex-shrink-0" />
                    {!collapsed && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-white truncate">{displayName}</span>
                            <span className="text-xs text-white/35 capitalize truncate flex items-center gap-1">
                                <Shield size={10} />
                                {role || 'analyst'}
                            </span>
                        </div>
                    )}
                </Link>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    title={collapsed ? 'Logout' : undefined}
                    className={[
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 w-full',
                        'text-white/40 hover:text-red-400 hover:bg-red-500/8',
                        collapsed ? 'justify-center' : '',
                    ].join(' ')}
                >
                    <LogOut size={18} strokeWidth={1.8} className="flex-shrink-0" />
                    {!collapsed && (
                        <span className="text-sm font-medium">Logout</span>
                    )}
                </button>
            </div>
        </aside>
    );
}
