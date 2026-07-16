import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    interviews: 0,
    applications: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getDashboardStats();

    setStats({
      students: data.stats.students,
      interviews: data.stats.interviews || 0,
      applications: data.stats.applications,
    });
  };

  return (
    <DashboardLayout>

      <h2 className="text-3xl font-bold mb-6">
        Mentor Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Students</h3>
          <h1 className="text-4xl font-bold">
            {stats.students}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Applications</h3>
          <h1 className="text-4xl font-bold">
            {stats.applications}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Interviews</h3>
          <h1 className="text-4xl font-bold">
            {stats.interviews}
          </h1>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;