import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(Cookies.get("auth") || null);

  function login(email, password) {
    // Mock login
    if (email === "admin@test.com" && password === "123456") {
      const userData = {
        email,
        role: "admin",
      };

      Cookies.set("auth", JSON.stringify(userData), {
        expires: 7,
      });

      setUser(userData);

      return true;
    }

    return false;
  }

  function logout() {
    Cookies.remove("auth");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
