import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check both localStorage and sessionStorage for authentication
  const localToken = localStorage.getItem("userToken");
  const sessionToken = sessionStorage.getItem("userToken");
  const isAuthenticated = localToken !== null || sessionToken !== null;
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;