import TopMetrics from "../../components/TopMetrics";
import GrowthTrendChart from "../../components/charts/GrowthTrendChart";
import SupplySide from "../../components/SupplySide";
import TopCorridors from "../../components/TopCorridors";
import UnitEconomics from "../../components/UnitEconomics";
import { DateProvider } from "../../context/DateContext";

export default function Overview() {
  return (
    <DateProvider>
      <div className="flex flex-col gap-6">

        {/* Top Metrics Card */}
        {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md"> */}
          <TopMetrics />
        {/* </div> */}

        {/* Supply Side Card */}
        {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md"> */}
          <SupplySide />
        {/* </div> */}

        {/* Growth Trend Chart Card */}
        {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md"> */}
          <GrowthTrendChart />
        {/* </div> */}

        {/* Top Corridors Card */}
        {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md"> */}
          <TopCorridors />
        {/* </div> */}

        {/* Unit Economics Card */}
        {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md"> */}
          <UnitEconomics />
        {/* </div> */}

      </div>
    </DateProvider>
  );
}
