import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Frontend-only mode - no auth checks
  // All routes are accessible for component development
  return <Outlet />;
};

export default ProtectedRoute;
