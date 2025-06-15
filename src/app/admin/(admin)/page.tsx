import DashboardOverview from "@/components/admin/OverView";
function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-poppins">
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
        <DashboardOverview />
      </main>
    </div>
  );
}

export default AdminDashboard;
