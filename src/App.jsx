import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Users from "./pages/User";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
