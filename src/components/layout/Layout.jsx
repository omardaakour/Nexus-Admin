import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
  flex
  min-h-screen
  bg-gray-50
  dark:bg-gray-950
"
    >
      {" "}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
