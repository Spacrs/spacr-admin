import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }: { children: React.ReactElement }) => {
  const auth_token = localStorage.getItem("access_token");
  const roleName = localStorage.getItem("role");
  const navigateRoute =
    roleName === "admin" ? `/${roleName}/users` : `/`;
  return !auth_token ? children : <Navigate to={navigateRoute} />;
};

export default PublicRoutes;
