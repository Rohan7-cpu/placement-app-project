import React from "react";
import { NavLink } from "react-router-dom";
import { menus } from "../../data/menu";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role?.toLowerCase() || "student";

  const menuItems = menus[role] || [];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="text-center text-2xl font-bold py-6 border-b border-slate-700">
        {role.charAt(0).toUpperCase() + role.slice(1)} Panel
      </div>

      <nav className="mt-5">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 transition-all ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;