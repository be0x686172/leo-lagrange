import HeaderUI from "../components/ui/header-container/container";
import { Outlet } from "react-router";
import './style.scss';

const Layout = () => {
    return (
        <div className="layout">
            <HeaderUI />
            <Outlet />
        </div>
    );
};

export default Layout;