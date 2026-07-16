import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function JobsBarChart({ data }) {
  return (
    <BarChart
      width={550}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="jobs"
        fill="#2563eb"
      />
    </BarChart>
  );
}

export default JobsBarChart;