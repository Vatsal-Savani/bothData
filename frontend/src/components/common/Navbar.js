import React from "react";
import logo from "../../assets/logo/logo.png";
import { setCurrentUser, setLogout } from "../../slices/employeeSlice";
import { useLogoutMutation } from "../../services/employees";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [logout, otherDetails] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.employee.currentUser);

  console.log(currentUser);

  const handleLogout = async () => {
    await logout();
    if (otherDetails.isError) {
      alert("issue while logout");
      return;
    }
    dispatch(setCurrentUser({}));
    dispatch(setLogout());
  };

  return (
    <>
      <nav class="flex justify-between px-20 py-10 items-center bg-white">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            currentUser.roleId == 1
              ? navigate("/employees")
              : navigate("/admin");
          }}
        >
          <img src={logo} alt="" style={{ height: "4vh" }} />
        </div>

        <div class="flex items-center">
          <ul class="flex items-center space-x-6">
            <li
              class="font-semibold text-gray-700"
              style={{ cursor: "pointer" }}
              onClick={() => {
                currentUser.roleId == 1
                  ? navigate("/employees")
                  : navigate("/admin");
              }}
            >
              Home
            </li>
            <li
              class="font-semibold text-gray-700"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/update")}
            >
              Profile
            </li>
            <li
              class="font-semibold text-gray-700"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/charts")}
            >
              Stats
            </li>

            <li
              class="font-semibold text-gray-700"
              onClick={() => handleLogout()}
              style={{ cursor: "pointer" }}
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
