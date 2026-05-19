import { useAuth } from "../context/useAuth";

import { Navigate } from "react-router-dom";


export function ProtectedRoute({ children }) {
    const { user, token } = useAuth();

    if (!user || !token) {
        return <Navigate to="/auth/login" replace />;
    }
    return children;
}