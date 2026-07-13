import { Users, UserCheck, UserX, DollarSign } from "lucide-react";
export const dashboardStats = {
  totalUsers: {
    value: 1284,
    icon: Users,
    change: "+12%",
  },

  activeUsers: {
    value: 1098,
    icon: UserCheck,
    change: "+8%",
  },

  inactiveUsers: {
    value: 186,
    icon: UserX,
    change: "-3%",
  },

  averageSalary: {
    value: 3250,
    icon: DollarSign,
    change: "+5%",
  },
};
export const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 240 },
  { month: "Apr", users: 310 },
  { month: "May", users: 420 },
  { month: "Jun", users: 510 },
  { month: "Jul", users: 620 },
];

export const departmentData = [
  { name: "Engineering", value: 42 },
  { name: "HR", value: 18 },
  { name: "Marketing", value: 22 },
  { name: "Sales", value: 18 },
];

export const recentActivity = [
  {
    id: 1,
    name: "John Smith",
    action: "Created a new user",
    time: "2 minutes ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    action: "Updated profile",
    time: "10 minutes ago",
  },
  {
    id: 3,
    name: "Mike Brown",
    action: "Deleted a user",
    time: "1 hour ago",
  },
  {
    id: 4,
    name: "Emily Davis",
    action: "Added HR employee",
    time: "Yesterday",
  },
];
