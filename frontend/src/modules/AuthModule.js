import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthModule = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.employee.isAuthenticated
  );

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={"/"} />;
};

export default AuthModule;
