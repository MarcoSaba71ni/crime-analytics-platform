import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const navigate = useNavigate();

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

    async function loginUser(e) {
        e.preventDefault();
        if (!validate()) return;
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

    const inputClass = (name) =>
        `bg-[var(--color-primary)] p-2 rounded text-white placeholder:text-white/50 border ${
            touched[name] && errors[name] ? 'border-red-400' : 'border-transparent'
        } focus:outline-none`;

    return (
        <form onSubmit={loginUser} className="flex flex-col bg-[var(--color-secondary)] p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-20">
            {error && <p className="mb-4 text-red-500 text-sm text-center">{error}</p>}
            <div className="mb-4 flex flex-col">
                <label className="font-redwing" htmlFor="email">Email:</label>
                <input
                    className={inputClass('email')}
                    type="email" id="email" name="email"
                    value={email}
                    onChange={handleChange(setEmail, 'email')}
                    onBlur={handleBlur}
                    placeholder="name@example.com"
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
                    placeholder="Enter your password"
                />
                {touched.password && errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
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
