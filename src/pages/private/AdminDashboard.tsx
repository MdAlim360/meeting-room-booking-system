import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Admin/Sidebar"; // Adjust import path as needed

const AdminDashboard = () => (
  <div className="flex h-full overflow-hidden">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      {/* <Header title="Admin Dashboard" /> */}
      <div className="flex-1 p-0 md:p-6">
        <Outlet /> {/* Render child routes here */}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
