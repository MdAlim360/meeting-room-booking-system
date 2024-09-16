import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
