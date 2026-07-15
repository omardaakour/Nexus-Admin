import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Users from "./pages/User";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
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
