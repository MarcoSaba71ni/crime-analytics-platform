import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        setError(null);
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }
            const data = await response.json();
            console.log('Login successful:', data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={loginUser} className="flex flex-col bg-[var(--color-secondary)] p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-20">
            {error && <p className="mb-4 text-red-500 text-sm text-center">{error}</p>}
            <div className="mb-4 flex flex-col">
                <label className="font-redwing"
                htmlFor="email">Email:</label>
                <input className="bg-[var(--color-primary)] p-2 rounded text-white placeholder:text-white/50" type="email" id="email" name="email"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </div>
            <div className="mb-4 flex flex-col">
                <label className="font-redwing"
                htmlFor="password">Password:</label>
                <input className="bg-[var(--color-primary)] p-2 rounded text-white placeholder:text-white/50" type="password" id="password" name="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p className="mt-4 text-center text-sm text-[var(--color-primary)]">Don't have an account? <Link to="/auth/register" className="underline">Register</Link></p>
        </form>
    )
}

export default Login
