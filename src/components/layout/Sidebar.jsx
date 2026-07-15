import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Users",
      path: "/users",
      icon: Users,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`
fixed
inset-y-0
left-0
z-50
w-64
flex-col
bg-white
dark:bg-gray-900
border-r
dark:border-gray-800
p-5
transition-transform
md:static
md:flex

${open ? "flex translate-x-0" : "-translate-x-full md:translate-x-0"}
`}
    >
      {/* Logo */}

      <h1
        className="
          mb-8
          text-2xl
          font-bold
          text-indigo-600
        "
      >
        Nexus
      </h1>
      <button
        onClick={() => setOpen(false)}
        className="
    absolute
    right-4
    top-4
    md:hidden
  "
      >
        <X size={20} />
      </button>
      {/* Links */}

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                transition

                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
                `
              }
            >
              <Icon size={20} />

              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
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
    </aside>
  );
}

export default Sidebar;
