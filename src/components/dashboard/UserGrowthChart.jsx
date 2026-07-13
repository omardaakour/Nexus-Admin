import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "../../context/ThemeContext";

function UserGrowthChart({ data }) {
  const { darkMode } = useTheme();

  return (
    <div className="dashboard-chart">
      <h2 className="dashboard-chart-title">User Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />

          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />

          <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />

          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#111827" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#111827",
            }}
          />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserGrowthChart;
