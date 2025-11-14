import DashboardOverview from "@/components/admin/OverView";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";

const getDashboardStats = async () => {
  const cookieStore = await cookies();
  const res = await api.get("/dashboardStats", {
    headers: { cookie: cookieStore.toString() },
  });
  console.log("Dashboard Stats:", res.data);
  return res.data;

};
async function AdminDashboard() {
  const data = await getDashboardStats();
  return (
    <div className="flex h-screen bg-gray-50 font-poppins">
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
        <DashboardOverview {...data} />
      </main>
    </div>
  );
}

export default AdminDashboard;
