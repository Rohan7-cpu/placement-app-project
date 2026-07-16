import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";

import ApplicationPieChart from "../../components/charts/ApplicationPieChart";
import JobsBarChart from "../../components/charts/JobsBarChart";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    mentors: 0,
    admins: 0,
    companies: 0,
    jobs: 0,
    applications: 0,
  });

  const [applicationStatus, setApplicationStatus] = useState([]);
  const [jobsByCompany, setJobsByCompany] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data.stats);
      setApplicationStatus(data.applicationStatus);
      setJobsByCompany(data.jobsByCompany);
      setRecentApplications(data.recentApplications);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h2 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h2>

      {/* Cards */}

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Students</h3>
          <p className="text-4xl font-bold text-blue-600">
            {stats.students}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Mentors</h3>
          <p className="text-4xl font-bold text-green-600">
            {stats.mentors}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Admins</h3>
          <p className="text-4xl font-bold text-red-600">
            {stats.admins}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Companies</h3>
          <p className="text-4xl font-bold text-purple-600">
            {stats.companies}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Jobs</h3>
          <p className="text-4xl font-bold text-orange-600">
            {stats.jobs}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Applications</h3>
          <p className="text-4xl font-bold text-pink-600">
            {stats.applications}
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-6 mt-8">

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Applications by Status
          </h2>

          <ApplicationPieChart
            data={applicationStatus}
          />

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Jobs by Company
          </h2>

          <JobsBarChart
            data={jobsByCompany}
          />

        </div>

      </div>

      {/* Recent Applications */}

      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Recent Applications
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Student
              </th>

              <th className="text-left p-3">
                Company
              </th>

              <th className="text-left p-3">
                Job
              </th>

              <th className="text-left p-3">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {recentApplications.map((app) => (

              <tr
                key={app._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {app.studentName}
                </td>

                <td>
                  {app.company}
                </td>

                <td>
                  {app.jobTitle}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded text-white ${
                      app.status === "Selected"
                        ? "bg-green-500"
                        : app.status === "Rejected"
                        ? "bg-red-500"
                        : app.status === "Interview"
                        ? "bg-purple-500"
                        : app.status === "Shortlisted"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {app.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;