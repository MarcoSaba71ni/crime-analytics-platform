import { useState } from 'react';
import { useAuth } from '../context/useAuth';

function LoginForm ({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            setIsLoading(true);
            await login(email, password);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col bg-[var(--color-secondary)] p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-20">
            <button
                type="button"
                onClick={onClose}
                aria-label="Close login form"
                className="absolute cursor-pointer top-3 right-3 bg-[var(--color-primary)] text-white px-2 py-1 rounded hover:bg-blue-500 transition-colors duration-300"
            >
                X
            </button>
            {error && <p className="mb-4 text-red-500 text-sm text-center">{error}</p>}
            <div className="mb-4 flex flex-col">
                <label className="font-redwing"
                htmlFor="email">Email:</label>
                <input className="bg-[var(--color-primary)] p-2 pl-1 rounded text-white" type="email" id="email" name="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4 flex flex-col">
                <label className="font-redwing"
                htmlFor="password">Password:</label>
                <input className="bg-[var(--color-primary)] p-2 pl-1 rounded text-white" type="password" id="password" name="password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-[var(--color-primary)] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p className="mt-4 text-center text-sm text-[var(--color-primary)]">Don't have an account? <a href="/auth/register" className="underline">Register</a></p>
        </form>
    )
}
export default LoginForm
