import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx';


function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [role, setRole ] = useState('analyst')

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate();

    const { login, setAuth } = useAuth();

    async function loginUser(e) {
        e.preventDefault();
        setLoginError(null);
        try {
            setLoginLoading(true);
            await login(loginEmail, loginPassword);
            navigate('/');
        } catch (error) {
            setLoginError(error.message);
        } finally {
            setLoginLoading(false);
        }
    }

        async function registerUser(e) {
            e.preventDefault();
            setError(null);
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, username, password, bio: bio || undefined , role }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Registration failed');
                }
                const data = await response.json();
                setAuth(data.user, data.access_token);
                navigate('/');
            } catch (error) {
                setError(error.message || 'Registration failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }


    return (
        <div className="bg-[url('../images/stockholm-view.webp')] bg-cover bg-center min-h-screen flex items-center justify-center px-4 py-10">

                <form onSubmit={loginUser} className="relative flex flex-col bg-[rgba(15,23,42,0.62)] p-6 md:p-8 rounded-xl shadow-lg w-full max-w-sm border border-white/20">
                    <h2 className="flex justify-center text-3xl text-white font-bold tracking-wide">Login</h2>
                    <p className="text-center text-white/70 text-sm mt-1 mb-5">Access your dashboard and saved areas</p>
                    {loginError && <p className="mb-4 text-red-400 text-sm text-center">{loginError}</p>}
                    <div className="mb-4 flex flex-col gap-1">
                        <label className="text-white font-redwing"
                        htmlFor="login-email">Email:</label>
                        <input className="bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/70" type="email" id="login-email" name="loginEmail" placeholder="name@example.com"
                        value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="mb-5 flex flex-col gap-1">
                        <label className="text-white font-redwing"
                        htmlFor="login-password">Password:</label>
                        <input className="bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/70" type="password" id="login-password" name="loginPassword" placeholder="Enter your password"
                        value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={loginLoading} className="bg-[var(--color-secondary)] text-black px-4 py-2.5 rounded font-semibold hover:bg-blue-400 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                        {loginLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="hidden lg:flex flex-col items-center justify-center mx-5 gap-3">
                    <div className="w-px bg-white/50 flex-1" />
                    <span className="text-white/70 text-xl font-semibold tracking-[0.3em] uppercase">or</span>
                    <div className="w-px bg-white/50 flex-1" />
                </div>
                <div className="flex lg:hidden items-center justify-center gap-3 py-1">
                    <div className="h-px bg-white/50 flex-1" />
                    <span className="text-white/70 text-sm font-semibold tracking-[0.3em] uppercase">or</span>
                    <div className="h-px bg-white/50 flex-1" />
                </div>
                <form onSubmit={registerUser}
                 className="relative flex flex-col bg-[rgba(15,23,42,0.62)] p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg border border-white/20">
                    <h2 className="flex justify-center text-3xl text-white font-bold tracking-wide">Register</h2>
                    <p className="text-center text-white/70 text-sm mt-1 mb-5">Create a new account as an Analyst or Crime Reporter</p>
                    {error && <p className="mb-4 text-red-400 text-sm text-center">{error}</p>}
                    <div className="flex gap-4">
                        <div className="flex flex-col flex-1">
                            <div className="mb-4 flex flex-col gap-1">
                                <label className="text-white font-redwing" 
                                htmlFor="register-email">Email:</label>
                                <input className="bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/70" type="email" id="register-email" name="registerEmail" placeholder="name@example.com" 
                                value={email} onChange={(e) => setEmail(e.target.value)} />            
                            </div>
                            <div className="mb-4 flex flex-col gap-1">
                                <label className="text-white font-redwing"
                                htmlFor="register-username">Username:</label>
                                <input className="bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/70" type="text" id="register-username" name="registerUsername" placeholder="Choose a username" 
                                value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-5 flex flex-col gap-1">
                                <label className="text-white font-redwing"
                                htmlFor="register-password">Password:</label>
                                <input className="bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/70" type="password" id="register-password" name="registerPassword" placeholder="Create a password" 
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>                                                        
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="mb-4 flex flex-col gap-1">
                                <label className="text-white font-redwing"
                                htmlFor='register-bio'>Bio:</label>
                                <textarea className="bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
                                id="register-bio" value={bio} onChange={(e) => setBio(e.target.value)} name="registerBio" placeholder="Tell us a bit about yourself (optional)" rows="3" />
                            </div>                            
                            <div className="mb-5 flex flex-col gap-2">
                                <p className="text-white font-redwing">Role:</p>
                                <label className="inline-flex items-center gap-2 text-white text-sm">
                                    <input
                                        type="radio"
                                        id="role-analyst"
                                        onChange={(e) => setRole(e.target.value)}
                                        name="role"
                                        value="analyst"
                                        checked={role === 'analyst'}
                                        className="h-4 w-4 bg-[var(--color-primary)]/85 rounded-full border-white/30 text-cyan-300 focus:ring-cyan-300/70"
                                    />
                                    Analyst
                                </label>
                                <label className="inline-flex items-center gap-2 text-white text-sm">
                                    <input
                                        type="radio"
                                        id="role-reporter"
                                        onChange={(e) => setRole(e.target.value)}
                                        name="role"
                                        value="crime_reporter"
                                        checked={role === 'crime_reporter'}
                                        className="h-4 w-4 rounded-full border-white/30 bg-[var(--color-primary)]/85 text-cyan-300 focus:ring-cyan-300/70"
                                    />
                                    Crime Reporter
                                </label>
                            </div>                            
                        </div>
                    </div>
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[var(--color-secondary)] text-black px-4 py-2.5 rounded font-semibold hover:bg-blue-400 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
    )
}

export default Register