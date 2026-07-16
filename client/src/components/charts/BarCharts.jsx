import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", jobs: 10 },
  { month: "Feb", jobs: 18 },
  { month: "Mar", jobs: 25 },
  { month: "Apr", jobs: 15 },
  { month: "May", jobs: 28 },
  { month: "Jun", jobs: 35 },
];

function BarCharts() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        Monthly Jobs Posted
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jobs" fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarCharts;