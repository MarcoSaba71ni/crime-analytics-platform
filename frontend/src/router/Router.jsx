import HomePage from "../pages/HomePage";
import Statistics from "../pages/Statistics";
import About from "../pages/About";   
import CrimePage from "../pages/CrimePage";
import Register from "../pages/Register";
import Login from "../pages/Login";

import { Routes , Route } from "react-router-dom";

function Router () {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/statistics" element={<Statistics/>} />
            <Route path="/about" element={<About/>} />
            <Route path ="/crime-page" element={<CrimePage/>} />
            <Route path="/auth/register" element={<Register/>} />
            <Route path="/auth/login" element={<Login/>} />
        </Routes>
    )
}

export default Router