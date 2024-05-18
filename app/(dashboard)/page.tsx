import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

const DashboardPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-6">
      <DataGrid />

      <DataCharts />
    </div>
  );
};

export default DashboardPage;
