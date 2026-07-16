import {  FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setShowMenu(false);
  navigate("/login");
};

  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          Placement Portal
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

       

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3"
          >

            <FaUserCircle
              size={40}
              className="text-blue-600"
            />

            <div className="text-left">

              <h3 className="font-semibold">
                {user?.name || "Guest"}
              </h3>

              <p className="text-sm text-gray-500">
                {user?.role || ""}
              </p>

            </div>

            <FaChevronDown />

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-lg border">

              <div className="p-4 border-b">

                <h3 className="font-semibold">
                  {user?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

              </div>

          

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;