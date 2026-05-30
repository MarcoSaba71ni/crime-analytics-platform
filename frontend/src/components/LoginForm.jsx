import { useState } from 'react';
import { useAuth } from '../context/useAuth';

function LoginForm ({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const { login } = useAuth();

    function validateField(name, value) {
        if (name === 'email') {
            if (!value.trim()) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        }
        if (name === 'password') {
            if (!value) return 'Password is required';
        }
        return '';
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }

    function handleChange(setter, name) {
        return (e) => {
            setter(e.target.value);
            if (touched[name]) {
                setErrors(prev => ({ ...prev, [name]: validateField(name, e.target.value) }));
            }
        };
    }

    function validate() {
        const newErrors = {
            email: validateField('email', email),
            password: validateField('password', password),
        };
        setErrors(newErrors);
        setTouched({ email: true, password: true });
        return !Object.values(newErrors).some(Boolean);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
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

    const inputClass = (name) =>
        `bg-[var(--color-primary)] p-2 pl-1 rounded text-white border ${
            touched[name] && errors[name] ? 'border-red-400' : 'border-transparent'
        } focus:outline-none`;

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
                <label className="font-redwing" htmlFor="email">Email:</label>
                <input
                    className={inputClass('email')}
                    type="email" id="email" name="email"
                    value={email}
                    onChange={handleChange(setEmail, 'email')}
                    onBlur={handleBlur}
                />
                {touched.email && errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4 flex flex-col">
                <label className="font-redwing" htmlFor="password">Password:</label>
                <input
                    className={inputClass('password')}
                    type="password" id="password" name="password"
                    value={password}
                    onChange={handleChange(setPassword, 'password')}
                    onBlur={handleBlur}
                />
                {touched.password && errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
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
