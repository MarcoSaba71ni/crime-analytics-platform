import HomePage from "../pages/HomePage";
import Statistics from "../pages/Statistics";
import About from "../pages/About";   
import CrimePage from "../pages/CrimePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import { PublicRoutes } from "./PublicRoutes";

import { Routes , Route } from "react-router-dom";

function Router () {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/statistics" element={<Statistics/>} />
            <Route path="/about" element={<About/>} />
            <Route path ="/crime-page" element={<CrimePage/>} />
            <Route path="auth">
                <Route path="login" element={
                    <PublicRoutes>
                        <Login/>
                    </PublicRoutes>
                } />
                <Route path="register" element={
                    <PublicRoutes>
                        <Register/>
                    </PublicRoutes>
                } />
            </Route>
            <Route path="/profile" element={
                <ProtectedRoute>
                    <ProfilePage/>
                </ProtectedRoute>
            } />
        </Routes>
    )
}

export default Router