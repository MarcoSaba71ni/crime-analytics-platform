import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function PublicRoutes({ children }) {
    const { user , token } = useAuth();

    if (user && token) {
        return <Navigate to="/" replace />;
    }
    return children;
}