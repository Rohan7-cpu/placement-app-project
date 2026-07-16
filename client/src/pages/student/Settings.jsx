import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";

function Settings() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <DashboardLayout>

      <PageHeader title="Settings" />

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Account Information
        </h2>

        <div className="space-y-4">

          <div>
            <label className="font-semibold block mb-2">
              Name
            </label>

            <input
              type="text"
              value={user?.name || ""}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Role
            </label>

            <input
              type="text"
              value={user?.role || ""}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

        </div>

        <div className="mt-8">

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Settings;