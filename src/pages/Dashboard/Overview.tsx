import TopMetrics from "../../components/TopMetrics";
import GrowthTrendChart from "../../components/charts/GrowthTrendChart";
import SupplySide from "../../components/SupplySide";
import TopCorridors from "../../components/TopCorridors";
import UnitEconomics from "../../components/UnitEconomics";

export default function Overview() {
  return (
    <div className="">
      <div className="bg-gray-100 p-6 space-y-6">
        <TopMetrics />
        <UnitEconomics />
        <GrowthTrendChart />
        <SupplySide />
        <TopCorridors />
      </div>
    </div>
  );
}
