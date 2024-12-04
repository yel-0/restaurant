import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = {
    role: "admin",
  };

  if (!user || user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
