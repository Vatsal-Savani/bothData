import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../slices/employeeSlice";

const Start = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogout());
  }, []);

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
