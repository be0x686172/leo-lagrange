import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout";
import LoginPage from "../pages/login";
import DashboardPage from "../pages/dashboard";
import StatisticsPage from '../pages/statistics';
import UsersPage from '../pages/users';
import SupportPage from '../pages/support';
import LogoutPage from '../pages/logout';
import CandidatesPage from '../pages/candidates';
import InterviewsPage from "../pages/interviews";

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="*" element={<DashboardPage />} />
                    <Route index path="/" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<DashboardPage />}>
                        <Route index path="candidates" element={<CandidatesPage />} />
                        <Route path="interviews" element={<InterviewsPage />} />
                    </Route>
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/support" element={<SupportPage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;