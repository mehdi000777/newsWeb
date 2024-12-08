import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../app/authSlice";

const ProtectedRoute = () => {
  const user = useSelector(selectCurrentUser);

  let content;

  if (!user) content = <Navigate to="/" replace />;
  else if (!user.isAdmin) content = <Navigate to="/" replace />;
  else content = <Outlet />;

  return content;
};

export default ProtectedRoute;
