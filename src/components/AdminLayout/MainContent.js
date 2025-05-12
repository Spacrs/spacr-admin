import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { selectLayout } from "../../store/slices/adminLayoutSlice/adminLayoutSlice";
import { useAppSelector } from "../../store/hooks";
import ResponsiveComponent from "./ResponsiveComponent";
function MainContent({ children, path, breadcrumb, showBreadcrumb = false, }) {
    const { showLeftSidebar } = useAppSelector(selectLayout);
    return showBreadcrumb ? (_jsx("div", { style: { width: showLeftSidebar ? "calc(100% - 300px)" : "100%" }, className: "h-full flex-col bg-white", children: _jsxs("div", { className: "h-full w-full flex-col overflow-y-scroll rounded-md bg-gray-200 p-2", children: [breadcrumb && _jsx(Breadcrumb, { title: path, breadcrumb: breadcrumb }), _jsx(ResponsiveComponent, {}), children] }) })) : (children);
}
export default MainContent;
