import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TopMetrics from "../../components/TopMetrics";
import GrowthTrendChart from "../../components/charts/GrowthTrendChart";
import SupplySide from "../../components/SupplySide";
import TopCorridors from "../../components/TopCorridors";
import UnitEconomics from "../../components/UnitEconomics";
export default function Overview() {
    return (_jsx("div", { className: "", children: _jsxs("div", { className: "bg-gray-100 p-6 space-y-6", children: [_jsx(TopMetrics, {}), _jsx(SupplySide, {}), _jsx(GrowthTrendChart, {}), _jsx(TopCorridors, {}), _jsx(UnitEconomics, {})] }) }));
}
