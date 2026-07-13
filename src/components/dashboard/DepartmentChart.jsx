import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useTheme } from "../../context/ThemeContext";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

function DepartmentChart({ data }) {
  const { darkMode } = useTheme();

  return (
    <div className="dashboard-chart">
      <h2 className="dashboard-chart-title">Users by Department</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#111827" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#111827",
            }}
          />

          <Legend
            wrapperStyle={{
              color: darkMode ? "#ffffff" : "#111827",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentChart;
