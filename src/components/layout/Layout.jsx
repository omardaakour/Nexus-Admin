import { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isUsersPage = location.pathname === "/users";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex h-screen flex-1 min-h-0 flex-col overflow-hidden">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main
          className={`flex-1 min-h-0 p-6 ${
            isUsersPage ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
