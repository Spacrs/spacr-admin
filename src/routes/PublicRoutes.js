import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
const PublicRoutes = ({ children }) => {
    const auth_token = localStorage.getItem("access_token");
    const roleName = 'admin';
    const navigateRoute = auth_token ? `/${roleName}/users` : `/`;
    return !auth_token ? children : _jsx(Navigate, { to: navigateRoute });
};
export default PublicRoutes;
