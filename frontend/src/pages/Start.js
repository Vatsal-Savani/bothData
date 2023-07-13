import React from "react";
import Login from "./Login";
import { Outlet, useNavigate } from "react-router-dom";

const Start = () => {
  return (
    <>
      <div></div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Start;
