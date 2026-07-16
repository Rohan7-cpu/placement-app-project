import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import { getReports } from "../../services/reportService";

function Reports() {
  const [report, setReport] = useState({
    students: 0,
    companies: 0,
    jobs: 0,
    applications: 0,
    interviews: 0,
    selected: 0,
    chart: [],
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReport(data);
    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  return (
    <DashboardLayout>

      <PageHeader title="Reports" />

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Students</h3>
          <h1 className="text-4xl font-bold text-blue-600">
            {report.students}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Companies</h3>
          <h1 className="text-4xl font-bold text-green-600">
            {report.companies}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Jobs</h3>
          <h1 className="text-4xl font-bold text-purple-600">
            {report.jobs}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Applications</h3>
          <h1 className="text-4xl font-bold text-orange-500">
            {report.applications}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Interviews</h3>
          <h1 className="text-4xl font-bold text-pink-500">
            {report.interviews}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Selected Students</h3>
          <h1 className="text-4xl font-bold text-green-700">
            {report.selected}
          </h1>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Bar Chart */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Application Status
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={report.chart}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="value">

                {report.chart.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-4">
            Application Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={report.chart}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {report.chart.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Reports;