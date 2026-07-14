import StatCard from "../components/dashboard/StatCard";
import UserGrowthChart from "../components/dashboard/UserGrowthChart";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import { useDashboardStats } from "../hooks/useDashboardStats";
import RecentActivity from "../components/dashboard/RecentActivity";
function Dashboard() {
  const { data, isLoading } = useDashboardStats();

  const stats = data
    ? [
        {
          title: "Total Users",
          ...data.stats.totalUsers,
        },

        {
          title: "Active Users",
          ...data.stats.activeUsers,
        },

        {
          title: "Inactive Users",
          ...data.stats.inactiveUsers,
        },

        {
          title: "Average Salary",
          value: `$${data.stats.averageSalary.value}`,
          icon: data.stats.averageSalary.icon,
          change: data.stats.averageSalary.change,
        },
      ]
    : [];
  if (isLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }
  return (
    <div
      className="
    min-h-screen
    bg-gray-50
    dark:bg-gray-950
    p-6
  "
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className="
    text-3xl
    font-bold
    tracking-tight
    text-gray-900
    dark:text-white
  "
        >
          Dashboard
        </h1>

        <p
          className="
    mt-2
    text-sm
    text-gray-500
    dark:text-gray-400
  "
        >
          Overview of company performance and user activity.
        </p>
      </div>
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      {/* Charts */}
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <UserGrowthChart data={data.growth} />
        <DepartmentChart data={data.departments} />
        <div className="mt-8">
          <RecentActivity data={data.recentActivity} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
