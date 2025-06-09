import DashboardCharts from "@/components/DashboardCharts";
import SummaryCards from "@/components/SummaryCards";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    // <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-6">Financial Overview</h1>
        <SummaryCards />
        <div className="mt-8">
          <DashboardCharts />
        </div>
      </div>
    // </ProtectedRoute>
  );
}
