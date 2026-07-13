import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProfileDropdown({ open }) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div
      className="
        absolute
        right-0
        top-12
        w-56
        rounded-xl
        border
        bg-white
        dark:bg-gray-900
        dark:border-gray-800
        p-3
        shadow-lg
      "
    >
      <div
        className="
          mb-3
          border-b
          pb-3
          dark:border-gray-800
        "
      >
        <p
          className="
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          Omar
        </p>

        <p
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Administrator
        </p>
      </div>

      <button
        onClick={() => navigate("/profile")}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2
          text-sm
          text-gray-700
          dark:text-gray-200
          hover:bg-gray-100
          dark:hover:bg-gray-800
        "
      >
        <User size={18} className="text-gray-500 dark:text-gray-400" />
        Profile
      </button>

      <button
        onClick={() => navigate("/settings")}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2
          text-sm
          text-gray-700
          dark:text-gray-200
          hover:bg-gray-100
          dark:hover:bg-gray-800
        "
      >
        <Settings size={18} className="text-gray-500 dark:text-gray-400" />
        Settings
      </button>

      <button
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2
          text-sm
          text-red-600
          dark:text-red-400
          hover:bg-red-50
          dark:hover:bg-red-950
        "
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default ProfileDropdown;
