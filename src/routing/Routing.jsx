import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Statistics from "../pages/statistics/Statistics";
import Users from "../pages/users/Users";
import Settings from "../pages/settings/Settings";
import Logout from "../pages/logout/Logout";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;