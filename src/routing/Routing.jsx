import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;