import {Link, useLocation} from 'react-router-dom'
import { useState , useEffect } from 'react';
import { UserCircle, LogOut , Heart, PlusCircle } from 'lucide-react';
import LoginForm from './LoginForm';
import { useAuth } from '../context/useAuth';

function Header () {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showLoginDiv, setShowLoginDiv] = useState(false);
    const { user, logout } = useAuth();
    const role = user?.role || "";
    const isAnalyst = role.toLowerCase() === "analyst";
    const isReporter = role.toLowerCase() === "crime_reporter";
    const location = useLocation();
    const hideLoginButton = location.pathname === '/auth/register';

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
            <div className="grid w-full grid-cols-3 items-center">
                <div className="flex justify-start">
                    <div className="bg-transparent hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <Link to="/">
                            <h1 className="text-4xl text-white line-through">SS</h1>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center">
                    <nav
                        className="px-6 py-3 rounded-b-full"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                        <ul className="flex gap-4 md:gap-8 lg:gap-12">
                            <li className="text-sm md:text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap">
                                <Link to="/statistics">Statistics</Link>
                            </li>
                            <li className="text-sm md:text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap">
                                <Link to="/about">Who We Are</Link>
                            </li>
                            <li className="text-sm md:text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap">
                                <Link to="/crime-history">Crime History</Link>
                            </li>
                            <li className="text-sm md:text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110 whitespace-nowrap">
                                <Link to="/zones">Zones</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center justify-end min-w-[200px]">
                    {!user && !showLoginDiv && !hideLoginButton && (
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="header_button text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500 transition-colors duration-300"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            Login
                        </button>
                    )}
                    {user && (
                        <div className='flex gap-4'>
                            {isAnalyst && (
                                <button>
                                    <Heart size={32} strokeWidth={1.5} className="text-white hover:text-red-400 cursor-pointer transition-colors duration-300" />
                                </button>
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
                                    onClick={logout}
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
