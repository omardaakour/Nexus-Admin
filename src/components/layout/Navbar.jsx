import { Bell, UserCircle, Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useState } from "react";
function Navbar({ setSidebarOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header
      className="
    flex
    h-16
    items-center
    justify-between
    border-b
    bg-white
    dark:bg-gray-900
    dark:border-gray-800
    px-6
  "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            rounded-lg
            p-2
            hover:bg-gray-100
            md:hidden
          "
        >
          <Menu size={24} />
        </button>

        <h2
          className="
  text-lg
  font-semibold
  text-gray-900
  dark:text-white
"
        >
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="rounded-full hover:bg-gray-100"
          >
            <UserCircle
              size={32}
              className="text-gray-600 dark:text-gray-300"
            />
          </button>

          <ProfileDropdown open={profileOpen} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
