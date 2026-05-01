import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TopMetrics from "../../components/TopMetrics";
import GrowthTrendChart from "../../components/charts/GrowthTrendChart";
import SupplySide from "../../components/SupplySide";
import TopCorridors from "../../components/TopCorridors";
import UnitEconomics from "../../components/UnitEconomics";
import { DateProvider } from "../../context/DateContext";
export default function Overview() {
    return (_jsx(DateProvider, { children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsx(TopMetrics, {}), _jsx(SupplySide, {}), _jsx(GrowthTrendChart, {}), _jsx(TopCorridors, {}), _jsx(UnitEconomics, {})] }) }));
}
