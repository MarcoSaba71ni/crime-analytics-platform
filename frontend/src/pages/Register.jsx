import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx';


function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [role, setRole] = useState('analyst');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    // Field-level validation state
    const [loginFieldErrors, setLoginFieldErrors] = useState({});
    const [loginTouched, setLoginTouched] = useState({});
    const [regErrors, setRegErrors] = useState({});
    const [regTouched, setRegTouched] = useState({});

    const navigate = useNavigate();
    const { login, setAuth } = useAuth();

    function validateLoginField(name, value) {
        if (name === 'loginEmail') {
            if (!value.trim()) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        }
        if (name === 'loginPassword') {
            if (!value) return 'Password is required';
        }
        return '';
    }

    function validateRegField(name, value) {
        if (name === 'email') {
            if (!value.trim()) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        }
        if (name === 'username') {
            if (!value.trim()) return 'Username is required';
            if (value.length < 3) return 'Username must be at least 3 characters';
            if (value.length > 20) return 'Username must be at most 20 characters';
            if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only letters, numbers, and underscores allowed';
        }
        if (name === 'password') {
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Password must be at least 8 characters';
        }
        if (name === 'bio') {
            if (value.length > 500) return 'Bio must be at most 500 characters';
        }
        return '';
    }

    function handleLoginBlur(e) {
        const { name, value } = e.target;
        setLoginTouched(prev => ({ ...prev, [name]: true }));
        setLoginFieldErrors(prev => ({ ...prev, [name]: validateLoginField(name, value) }));
    }

    function handleRegBlur(e) {
        const { name, value } = e.target;
        setRegTouched(prev => ({ ...prev, [name]: true }));
        setRegErrors(prev => ({ ...prev, [name]: validateRegField(name, value) }));
    }

    function handleLoginChange(setter, name) {
        return (e) => {
            setter(e.target.value);
            if (loginTouched[name]) {
                setLoginFieldErrors(prev => ({ ...prev, [name]: validateLoginField(name, e.target.value) }));
            }
        };
    }

    function handleRegChange(setter, name) {
        return (e) => {
            setter(e.target.value);
            if (regTouched[name]) {
                setRegErrors(prev => ({ ...prev, [name]: validateRegField(name, e.target.value) }));
            }
        };
    }

    function validateLoginForm() {
        const newErrors = {
            loginEmail: validateLoginField('loginEmail', loginEmail),
            loginPassword: validateLoginField('loginPassword', loginPassword),
        };
        setLoginFieldErrors(newErrors);
        setLoginTouched({ loginEmail: true, loginPassword: true });
        return !Object.values(newErrors).some(Boolean);
    }

    function validateRegForm() {
        const newErrors = {
            email: validateRegField('email', email),
            username: validateRegField('username', username),
            password: validateRegField('password', password),
            bio: validateRegField('bio', bio),
        };
        setRegErrors(newErrors);
        setRegTouched({ email: true, username: true, password: true, bio: true });
        return !Object.values(newErrors).some(Boolean);
    }

    async function loginUser(e) {
        e.preventDefault();
        if (!validateLoginForm()) return;
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
        if (!validateRegForm()) return;
        setError(null);
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password, bio: bio || undefined, role }),
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

    const loginInputClass = (name) =>
        `bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border ${
            loginTouched[name] && loginFieldErrors[name]
                ? 'border-red-400 focus:ring-red-400/50'
                : 'border-white/20 focus:ring-cyan-300/70'
        } focus:outline-none focus:ring-2`;

    const regInputClass = (name) =>
        `bg-[var(--color-primary)]/85 p-2.5 rounded text-white placeholder:text-white/50 border ${
            regTouched[name] && regErrors[name]
                ? 'border-red-400 focus:ring-red-400/50'
                : 'border-white/20 focus:ring-cyan-300/70'
        } focus:outline-none focus:ring-2`;

    return (
        <div className="bg-[url('../images/stockholm-view.webp')] bg-cover bg-center min-h-screen px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch justify-center gap-6 lg:flex-row lg:items-center">
                <form onSubmit={loginUser} className="relative flex w-full flex-col rounded-xl border border-white/20 bg-[rgba(15,23,42,0.62)] p-5 shadow-lg sm:p-6 md:p-8 lg:max-w-sm">
                    <h2 className="flex justify-center text-3xl text-white font-bold tracking-wide">Login</h2>
                    <p className="text-center text-white/70 text-sm mt-1 mb-5">Access your dashboard and saved areas</p>
                    {loginError && <p className="mb-4 text-red-400 text-sm text-center">{loginError}</p>}
                    <div className="mb-4 flex flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="login-email">Email:</label>
                        <input
                            className={loginInputClass('loginEmail')}
                            type="email" id="login-email" name="loginEmail"
                            placeholder="name@example.com"
                            value={loginEmail}
                            onChange={handleLoginChange(setLoginEmail, 'loginEmail')}
                            onBlur={handleLoginBlur}
                        />
                        {loginTouched.loginEmail && loginFieldErrors.loginEmail && (
                            <p className="text-red-400 text-xs">{loginFieldErrors.loginEmail}</p>
                        )}
                    </div>
                    <div className="mb-5 flex flex-col gap-1">
                        <label className="text-white font-redwing" htmlFor="login-password">Password:</label>
                        <input
                            className={loginInputClass('loginPassword')}
                            type="password" id="login-password" name="loginPassword"
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={handleLoginChange(setLoginPassword, 'loginPassword')}
                            onBlur={handleLoginBlur}
                        />
                        {loginTouched.loginPassword && loginFieldErrors.loginPassword && (
                            <p className="text-red-400 text-xs">{loginFieldErrors.loginPassword}</p>
                        )}
                    </div>
                    <button type="submit" disabled={loginLoading} className="bg-[var(--color-secondary)] text-black px-4 py-2.5 rounded font-semibold hover:bg-blue-400 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                        {loginLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="hidden lg:flex flex-col items-center justify-center px-2 gap-3">
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
                 className="relative flex w-full flex-col rounded-xl border border-white/20 bg-[rgba(15,23,42,0.62)] p-5 shadow-lg sm:p-6 md:p-8 lg:max-w-2xl">
                    <h2 className="flex justify-center text-3xl text-white font-bold tracking-wide">Register</h2>
                    <p className="text-center text-white/70 text-sm mt-1 mb-5">Create a new account as an Analyst or Crime Reporter</p>
                    {error && <p className="mb-4 text-red-400 text-sm text-center">{error}</p>}
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex flex-col flex-1">
                            <div className="mb-4 flex flex-col gap-1">
                                <label className="text-white font-redwing" htmlFor="register-email">Email:</label>
                                <input
                                    className={regInputClass('email')}
                                    type="email" id="register-email" name="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={handleRegChange(setEmail, 'email')}
                                    onBlur={handleRegBlur}
                                />
                                {regTouched.email && regErrors.email && (
                                    <p className="text-red-400 text-xs">{regErrors.email}</p>
                                )}
                            </div>
                            <div className="mb-4 flex flex-col gap-1">
                                <label className="text-white font-redwing" htmlFor="register-username">Username:</label>
                                <input
                                    className={regInputClass('username')}
                                    type="text" id="register-username" name="username"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={handleRegChange(setUsername, 'username')}
                                    onBlur={handleRegBlur}
                                />
                                {regTouched.username && regErrors.username && (
                                    <p className="text-red-400 text-xs">{regErrors.username}</p>
                                )}
                            </div>
                            <div className="mb-5 flex flex-col gap-1">
                                <label className="text-white font-redwing" htmlFor="register-password">Password:</label>
                                <input
                                    className={regInputClass('password')}
                                    type="password" id="register-password" name="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={handleRegChange(setPassword, 'password')}
                                    onBlur={handleRegBlur}
                                />
                                {regTouched.password && regErrors.password && (
                                    <p className="text-red-400 text-xs">{regErrors.password}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="mb-4 flex flex-col gap-1">
                                <label className="text-white font-redwing" htmlFor='register-bio'>Bio:</label>
                                <textarea
                                    className={regInputClass('bio')}
                                    id="register-bio" name="bio"
                                    value={bio}
                                    onChange={handleRegChange(setBio, 'bio')}
                                    onBlur={handleRegBlur}
                                    placeholder="Tell us a bit about yourself (optional)"
                                    rows="3"
                                />
                                {regTouched.bio && regErrors.bio && (
                                    <p className="text-red-400 text-xs">{regErrors.bio}</p>
                                )}
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
        </div>
    )
}

export default Register
