import {Link} from 'react-router-dom'
import { useState , useEffect } from 'react';
import LoginForm from './LoginForm';

function Header () {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showLoginDiv, setShowLoginDiv] = useState(false);

    useEffect(() => {
        if (isLoginOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowLoginDiv(true);
        } else {
            setShowLoginDiv(false);
        }
    }, [isLoginOpen]);


    return (
        <header className="fixed top-0 left-0 w-full z-20 flex items-center justify-between px-12 bg-transparent">
            <div className="bg-transparent hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                <Link to="/">
                    <h1 className="text-4xl text-white line-through">SS</h1>                    
                </Link>
            </div>
            <nav
                className="px-12 py-3 rounded-b-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
            >
                <ul className="flex gap-12">
                    <li className="text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <Link to="/statistics">Statistics</Link>
                    </li>
                    <li className="text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <Link to="/about">Who We Are</Link>
                    </li>
                    <li className="text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <Link to="/crime-history">Crime History</Link>
                    </li>
                    <li className="text-lg text-white hover:cursor-pointer transition-transform duration-300 hover:scale-110">
                        <Link to="/zones">Zones</Link>
                    </li>
                </ul>
            </nav>
            <div className="bg-transparent">
                <Link>
                    <button
                    onClick={() => setIsLoginOpen(true)}
                        className="header_button text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500 transition-colors duration-300"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                        Login
                    </button>
                </Link>
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
