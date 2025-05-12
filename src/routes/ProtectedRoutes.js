import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
    const auth_token = localStorage.getItem("access_token");
    return auth_token ? children : _jsx(Navigate, { to: "/" });
};
export default ProtectedRoutes;
