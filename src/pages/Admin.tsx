import React from "react";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";

const Admin = () => {
  // Frontend-only mode - no auth checks
  return <SuperAdminDashboard />;
};

export default Admin;