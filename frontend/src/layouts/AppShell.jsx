import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function AppShell() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-[#030f1e]">
            {/* Mobile backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/60 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed((prev) => !prev)}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            {/* Main content — offset by sidebar width on md+ */}
            <div
                className={[
                    'flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300',
                    collapsed ? 'md:ml-16' : 'md:ml-64',
                ].join(' ')}
            >
                {/* Mobile top bar */}
                <div className="md:hidden flex items-center gap-3 h-14 px-4 border-b border-white/8 bg-[var(--color-primary)] flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="text-white/60 hover:text-white transition-colors"
                        aria-label="Open navigation"
                    >
                        <Menu size={22} strokeWidth={1.8} />
                    </button>
                    <span className="font-redwing text-xl text-white tracking-wider">SS</span>
                </div>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
