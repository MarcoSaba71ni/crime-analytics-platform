import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function ProtectedRoute({ children }) {
    const { user, token } = useAuth();

    if (!user || !token) {
        return <Navigate to="/auth/login" replace />;
    }

    // Used as a layout route (<Route element={<ProtectedRoute />}>) → render Outlet
    // Used as a wrapper component (<ProtectedRoute><Page/></ProtectedRoute>) → render children
    return children ?? <Outlet />;
}