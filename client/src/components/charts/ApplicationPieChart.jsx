import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#f59e0b",
  "#8b5cf6",
  "#22c55e",
  "#ef4444",
];

function ApplicationPieChart({ data }) {
  return (
    <PieChart width={420} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />

      <Legend />
    </PieChart>
  );
}

export default ApplicationPieChart;