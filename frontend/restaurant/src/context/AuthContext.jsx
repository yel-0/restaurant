import { createContext, useState, useContext, useEffect } from "react";
import { useAuthUser } from "@/Hook/Auth/useAuthUser";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { data, isLoading, isError, error } = useAuthUser();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };
