import {Link, useLocation} from 'react-router-dom'
import { useState , useEffect } from 'react';
import { UserCircle, LogOut , Bookmark, PlusCircle, Menu, X } from 'lucide-react';
import LoginForm from './LoginForm';
import { useAuth } from '../context/useAuth';
import { useSelector } from 'react-redux';
import { deleteSavedCrime } from '../store/savedSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header () {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showLoginDiv, setShowLoginDiv] = useState(false);
    const { user, logout } = useAuth();
    const role = user?.role || "";
    const isAnalyst = role.toLowerCase() === "analyst";
    const isReporter = role.toLowerCase() === "crime_reporter";
    const location = useLocation();
    const hideLoginButton = location.pathname === '/auth/register';
    const changeHeaderNav = location.pathname === '/statistics' || location.pathname === '/about' || location.pathname === '/zones' || location.pathname === '/crime-history';
    const savedCrimes = useSelector((state) => state.saved.savedCrimes);
    const [showSavedCrimes, setShowSavedCrimes] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleToggleSavedCrime() {
        setShowSavedCrimes((prev) => !prev);
    }

    function handleCloseSavedCrimes() {
        setShowSavedCrimes(false);
    }

    async function handleLogout() {
        await logout();
        navigate("/auth/register", { replace: true }); // Redirect to login page after logout
    }

    useEffect(() => {
        if (isLoginOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowLoginDiv(true);
        } else {
            setShowLoginDiv(false);
        }
    }, [isLoginOpen]);

    return (
        <header className="fixed top-0 left-0 w-full z-20 px-6 md:px-12 bg-transparent">
            <div className="sm:hidden relative flex w-full items-center justify-between py-4">
                <div className="flex w-12 justify-start">
                    {user && isAnalyst && (
                        <button
                            type="button"
                            onClick={handleToggleSavedCrime}
                            aria-label="Open saved crimes"
                        >
                            <Bookmark size={28} strokeWidth={1.5} className="text-white hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300" />
                        </button>
                    )}
                    {user && isReporter && (
                        <button type="button" aria-label="Create new report">
                            <PlusCircle size={28} strokeWidth={1.5} className="text-white hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300" />
                        </button>
                    )}
                </div>

                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link to="/" className="inline-block bg-transparent hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <h1 className="text-4xl text-white line-through">SS</h1>
                    </Link>
                </div>

                <div className="flex w-12 justify-end">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        className="text-white"
                    >
                        {isMobileMenuOpen ? (
                            <X size={30} strokeWidth={1.8} className="hover:text-[var(--color-secondary)] transition-colors duration-300" />
                        ) : (
                            <Menu size={30} strokeWidth={1.8} className="hover:text-[var(--color-secondary)] transition-colors duration-300" />
                        )}
                    </button>
                </div>

                {showSavedCrimes && isAnalyst && (
                    <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-white/10 bg-[var(--color-primary)] text-white shadow-2xl z-50">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <h3 className="text-sm font-redwing tracking-wider">Saved Crimes</h3>
                            <button
                                type="button"
                                onClick={handleCloseSavedCrimes}
                                className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                        <div className="px-4 py-3 border-t border-white/10">
                            <Link to="/profile" onClick={handleCloseSavedCrimes} className="text-xs text-[var(--color-secondary)] hover:underline">
                                View full List
                            </Link>
                        </div>

                        <div className="max-h-80 overflow-y-auto px-4 py-3">
                            {savedCrimes.length === 0 ? (
                                <p className="text-sm text-white/70">No saved crimes yet.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {savedCrimes.map((crime) => {
                                        return (
                                            <li key={crime.id} className="rounded bg-white/5 px-3 py-2">
                                                <p className="text-sm font-semibold text-white truncate">
                                                    {crime.title || `Crime ${crime.id}`}
                                                </p>
                                                <p className="text-xs text-white/70 truncate">
                                                    {crime.location || 'Location unavailable'}
                                                </p>
                                                <p className="text-xs text-white/70 mt-1 line-clamp-2">
                                                    {crime.description || 'Description unavailable'}
                                                </p>
                                                <div className="flex gap-4 mt-2">
                                                    <Link
                                                        to={`/crime-page?id=${crime.id}`}
                                                        onClick={handleCloseSavedCrimes}
                                                        className="inline-block mt-1 text-xs text-[var(--color-secondary)] hover:underline"
                                                    >
                                                        Open
                                                    </Link>
                                                    <div>
                                                        <button
                                                            className="inline-block text-xs text-white p-1 bg-red-600 cursor-pointer rounded hover:bg-red-700 transition-colors"
                                                            onClick={() => dispatch(deleteSavedCrime(crime.id))}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {isMobileMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-white/10 bg-[var(--color-primary)] text-white shadow-2xl z-50 p-4">
                        <nav>
                            <ul className="flex flex-col gap-3 text-sm">
                                <li>
                                    <Link to="/statistics" onClick={() => setIsMobileMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-white/10">Statistics</Link>
                                </li>
                                <li>
                                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-white/10">Who We Are</Link>
                                </li>
                                <li>
                                    <Link to="/crime-history" onClick={() => setIsMobileMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-white/10">Crime History</Link>
                                </li>
                                <li>
                                    <Link to="/zones" onClick={() => setIsMobileMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-white/10">Zones</Link>
                                </li>
                                {user && (
                                    <li>
                                        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-white/10">My Profile</Link>
                                    </li>
                                )}
                                {user && (
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                handleLogout();
                                            }}
                                            className="block w-full text-left rounded px-3 py-2 hover:bg-white/10 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                )}
                                {!user && !hideLoginButton && (
                                    <li>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setIsLoginOpen(true);
                                            }}
                                            className="block w-full text-left rounded px-3 py-2 hover:bg-white/10 cursor-pointer"
                                        >
                                            Login
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            <div className="hidden sm:grid w-full grid-cols-3 items-center">
                <div className="flex justify-start">
                    <div className="bg-transparent hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <Link to="/">
                            <h1 className="text-4xl text-white line-through">SS</h1>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                    <nav
                        className={`px-6 py-3 rounded-b-full ${changeHeaderNav ? 'text-[var(--color-primary)]' : 'bg-[var(--color-primary)]'} transition-colors duration-300`}
                        style={{ backgroundColor: changeHeaderNav ? 'var(--color-secondary)' : 'var(--color-primary)' }}
                    >
                        <ul className="flex gap-4 md:gap-8 lg:gap-12">
                            <li className={`text-sm md:text-lg ${changeHeaderNav ? 'text-[var(--color-primary)]' : 'text-white'} hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap`}>
                                <Link to="/statistics">Statistics</Link>
                            </li>
                            <li className={`text-sm md:text-lg ${changeHeaderNav ? 'text-[var(--color-primary)]' : 'text-white'} hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap`}>
                                <Link to="/about">Who We Are</Link>
                            </li>
                            <li className={`text-sm md:text-lg ${changeHeaderNav ? 'text-[var(--color-primary)]' : 'text-white'} hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap`}>
                                <Link to="/crime-history">Crime History</Link>
                            </li>
                            <li className={`text-sm md:text-lg ${changeHeaderNav ? 'text-[var(--color-primary)]' : 'text-white'} hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap`}>
                                <Link to="/zones">Zones</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center justify-end min-w-[200px]">
                    {!user && !showLoginDiv && !hideLoginButton && (
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className={`header_button px-4 py-2 rounded cursor-pointer hover:bg-blue-500 ${changeHeaderNav ? 'text-[var(--color-primary)]' : 'text-white'} transition-colors duration-300`}
                            style={{ backgroundColor: changeHeaderNav ? 'var(--color-secondary)' : 'var(--color-primary)' }}
                        >
                            Login
                        </button>
                    )}
                    {user && (
                        <div className='flex gap-4'>
                            {isAnalyst && (
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={handleToggleSavedCrime}
                                        aria-label="Open saved crimes"
                                    >
                                        <Bookmark size={32} strokeWidth={1.5} className="text-white hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300" />
                                    </button>

                                    {showSavedCrimes && (
                                        <div className="absolute top-full right-0 mt-2 w-80 rounded-lg border border-white/10 bg-[var(--color-primary)] text-white shadow-2xl z-50">
                                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                                <h3 className="text-sm font-redwing tracking-wider">Saved Crimes</h3>
                                                <button
                                                    type="button"
                                                    onClick={handleCloseSavedCrimes}
                                                    className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                            <div className="px-4 py-3 border-t border-white/10">
                                                <Link to="/profile" className="text-xs text-[var(--color-secondary)] hover:underline">
                                                    View full List
                                                </Link>
                                            </div>

                                            <div className="max-h-80 overflow-y-auto px-4 py-3">
                                                {savedCrimes.length === 0 ? (
                                                    <p className="text-sm text-white/70">No saved crimes yet.</p>
                                                ) : (
                                                    <ul className="space-y-2">
                                                        {savedCrimes.map((crime) => {
                                                            return (
                                                                <li key={crime.id} className="rounded bg-white/5 px-3 py-2">
                                                                    <p className="text-sm font-semibold text-white truncate">
                                                                        {crime.title || `Crime ${crime.id}`}
                                                                    </p>
                                                                    <p className="text-xs text-white/70 truncate">
                                                                        {crime.location || 'Location unavailable'}
                                                                    </p>
                                                                    <p className="text-xs text-white/70 mt-1 line-clamp-2">
                                                                        {crime.description || 'Description unavailable'}
                                                                    </p>
                                                                    <div className="flex gap-4 mt-2">
                                                                        <Link
                                                                            to={`/crime-page?id=${crime.id}`}
                                                                            onClick={handleCloseSavedCrimes}
                                                                            className="inline-block mt-1 text-xs text-[var(--color-secondary)] hover:underline"
                                                                        >
                                                                            Open
                                                                        </Link>    
                                                                        <div>
                                                                            <button
                                                                                className="inline-block text-xs text-white p-1 bg-red-600 cursor-pointer rounded hover:bg-red-700 transition-colors"
                                                                                onClick={() => dispatch(deleteSavedCrime(crime.id))}
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>                                                                
                                                                    </div>

                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {isReporter && (
                                <button>
                                    <PlusCircle size={32} strokeWidth={1.5} className="text-white hover:text-[var(--color-secondary)] cursor-pointer transition-colors duration-300" />
                                </button>
                            )}
                            <div>
                                <Link to="/profile" className="text-white hover:text-cyan-300 transition-colors duration-300">
                                    <UserCircle size={32} strokeWidth={1.5} />
                                </Link>
                            </div>
                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-red-400 transition-colors duration-300 cursor-pointer bg-transparent border-none"
                                >
                                    <LogOut size={32} strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showLoginDiv && (
            <div className="fixed inset-0 z-40 bg-black/50">
                <div className="mx-auto mt-24 w-full max-w-md rounded-lg p-6">
                    <LoginForm onClose={() => setIsLoginOpen(false)} />
                </div>
            </div>
            )}
        </header>
    )
}

export default Header
