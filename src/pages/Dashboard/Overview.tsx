import TopMetrics from "../../components/TopMetrics";
import GrowthTrendChart from "../../components/charts/GrowthTrendChart";
import SupplySide from "../../components/SupplySide";
import TopCorridors from "../../components/TopCorridors";
import UnitEconomics from "../../components/UnitEconomics";
import { DateProvider } from "../../context/DateContext";

export default function Overview() {
  return (
    <DateProvider>
      <div className="">
        <div className="bg-gray-100 p-6 space-y-6">
          <TopMetrics />
          <SupplySide />
          <GrowthTrendChart />
          <TopCorridors />
          <UnitEconomics />
        </div>
      </div>
    </DateProvider>
  );
}
