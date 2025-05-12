import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "../../components/AdminLayout/Header";
import MainContent from "../../components/AdminLayout/MainContent";
import Sidebar from "../../components/AdminLayout/Sidebar";
import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "../../routes/routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { icons } from "../../Icons/constant";
import { updateLayout } from "../../store/slices/adminLayoutSlice/adminLayoutSlice";
const { RiExpandRightLine } = icons;
function AdminLayout() {
    const layout = useAppSelector((state) => state.adminLayoutSlice.layout);
    const dispatch = useAppDispatch();
    return (_jsxs("div", { className: "h-screen bg-slate-100", children: [layout?.showHeader && _jsx(Header, {}), _jsxs("div", { style: { height: layout?.showHeader ? "calc(100% - 70px)" : "100%" }, className: "w-screen flex", children: [layout?.showLeftSidebar ? (_jsx(Sidebar, {})) : (_jsx(RiExpandRightLine, { className: "text-primary bg-lightBlue rounded-full cursor-pointer", style: {
                            fontSize: "12px",
                            padding: "5px",
                            width: "25px",
                            height: "25px",
                        }, onClick: () => dispatch(updateLayout({ showLeftSidebar: !layout?.showLeftSidebar })) })), _jsx(Routes, { children: adminRoutes.map(({ path, breadcrumb, showBreadcrumb, component: Component }) => (_jsx(Route, { path: path, element: _jsx(MainContent, { path: path, breadcrumb: breadcrumb, showBreadcrumb: showBreadcrumb, children: _jsx(Component, {}) }) }, path))) })] })] }));
}
export default AdminLayout;
