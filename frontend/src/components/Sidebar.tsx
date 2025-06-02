import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">JobHunter</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          Saved Jobs
        </NavLink>
        <NavLink
          to="/applications"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          Applications
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
