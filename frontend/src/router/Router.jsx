import { Routes, Route } from "react-router-dom";
import ProfileCompletion from "../pages/Profile-Completion";

import PublicLayout from "../layouts/PublicLayout";
import AppShell from "../layouts/AppShell";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoutes } from "./PublicRoutes";

import HomePage from "../pages/HomePage";
import Statistics from "../pages/Statistics";
import About from "../pages/About";
import CrimePage from "../pages/CrimePage";
import CrimeHistory from "../pages/CrimeHistory";
import Zones from "../pages/Zones";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfilePage from "../pages/ProfilePage";
import Dashboard from "../pages/Dashboard";

function Router() {
    return (
        <Routes>
            {/* ── Public pages (with Header) ── */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/about" element={<About />} />
                <Route path="/crime-history" element={<CrimeHistory />} />
                <Route path="/profile-completion" element={<ProfileCompletion />} />
                <Route path="auth">
                    <Route
                        path="login"
                        element={
                            <PublicRoutes>
                                <Login />
                            </PublicRoutes>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <PublicRoutes>
                                <Register />
                            </PublicRoutes>
                        }
                    />
                </Route>
            </Route>

            {/* ── Protected dashboard (with Sidebar/AppShell) ── */}
            <Route element={<ProtectedRoute />}>
                <Route element={<AppShell />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/zones" element={<Zones />} />
                    <Route path="/dashboard/statistics" element={<Statistics />} />
                    <Route path="/dashboard/crime-history" element={<CrimeHistory />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/crime-page" element={<CrimePage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
