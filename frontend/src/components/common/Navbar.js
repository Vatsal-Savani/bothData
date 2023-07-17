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
      <nav className="flex justify-between px-20 py-6 items-center bg-[#343638] border-b-2">
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

        <div className="flex items-center">
          <ul className="flex items-center space-x-6 text-white">
            <li
              className="font-semibold  px-5 navLists"
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
              className="font-semibold px-5 navLists"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/update")}
            >
              Profile
            </li>
            <li
              className="font-semibold px-5 navLists"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/charts")}
            >
              Stats
            </li>

            <li
              className="font-semibold px-5 navLists"
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
