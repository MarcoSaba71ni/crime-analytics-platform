import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || null
    );

    function setAuth(userData, accessToken) {
        setUser(userData);
        setToken(accessToken);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    async function login(email, password) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login failed');
        }

        const data = await response.json();
        setAuth(data.user, data.access_token);
        return data;
    }

    async function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }

    useEffect(() => {
        if (!token) return;

        async function validateToken() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!response.ok) {
                    logout();
                    return;
                }
                const data = await response.json();
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            } catch {
                logout();
            }
        }

        validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentionally mount-only: validates token restored from localStorage on page refresh

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}