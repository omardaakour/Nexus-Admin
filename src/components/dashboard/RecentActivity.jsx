function RecentActivity({ data = [] }) {
  return (
    <div className="dashboard-chart">
      <h2 className="dashboard-chart-title">Recent Activity</h2>

      <div className="space-y-4">
        {data.map((activity) => (
          <div
            key={activity.id}
            className="
              flex
              items-center
              justify-between
              rounded-lg
              border-b
              pb-4
              last:border-none
            "
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-indigo-100
                  text-sm
                  font-semibold
                  text-indigo-600
                "
              >
                {activity.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.name}
                </p>

                <p className="text-sm text-gray-500">{activity.action}</p>
              </div>
            </div>

            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
