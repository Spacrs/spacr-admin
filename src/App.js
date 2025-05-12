import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { protectedRoutes, authRoutes } from "./routes/routes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
function App() {
    return (_jsx("div", { children: _jsx(Router, { children: _jsxs(Routes, { children: [protectedRoutes.map(({ path, component: Component }) => {
                        return (_jsx(Route, { path: path, element: _jsx(ProtectedRoutes, { children: _jsx(Component, {}) }) }, path));
                    }), authRoutes.map(({ path, component: Component }) => {
                        return (_jsx(Route, { path: path, element: _jsx(PublicRoutes, { children: _jsx(Component, {}) }) }, path));
                    })] }) }) }));
}
export default App;
