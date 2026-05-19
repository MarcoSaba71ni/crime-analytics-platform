import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

export function PublicRoutes({ children }) {
    const { user, token } = useAuth();

    if (user && token) {
        return <Navigate to="/" replace />;
    }
    return children;
}