import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashboard";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<DashboardPage />} />
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;