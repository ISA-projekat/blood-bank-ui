import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  if (!isAllowed) {
    alert("You are not authorized to see this page");
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
