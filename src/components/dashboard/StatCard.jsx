import { User, DollarSign } from "lucide-react";

function StatCard({ title, value, change, icon: Icon }) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        dark:bg-gray-900
        dark:border-gray-800
        p-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div className="flex items-center justify-between">
        <p
          className="
            text-sm
            font-medium
            text-gray-500
            dark:text-gray-400
          "
        >
          {title}
        </p>

        <div
          className="
            rounded-xl
            bg-blue-50
            p-3
            dark:bg-blue-950
          "
        >
          {Icon && (
            <Icon size={22} className="text-blue-600 dark:text-blue-400" />
          )}
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <h2
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          {value}
        </h2>

        <span
          className="
            rounded-full
            bg-green-50
            px-3
            py-1
            text-xs
            font-semibold
            text-green-600
            dark:bg-green-950
            dark:text-green-400
          "
        >
          {change}
        </span>
      </div>

      <p
        className="
          mt-3
          text-sm
          text-gray-500
          dark:text-gray-400
        "
      >
        Compared to last month
      </p>
    </div>
  );
}

export default StatCard;
