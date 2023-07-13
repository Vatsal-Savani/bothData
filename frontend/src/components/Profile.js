import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useUpdateEmployeeByAdminMutation,
  useUpdateEmployeeMutation,
} from "../services/employees";

const WorkStatusOptions = [
  { id: 1, value: "Work from Office" },
  { id: 2, value: "Work from Home" },
  { id: 3, value: "Half Leave" },
  { id: 4, value: "Full Leave" },
];

const DepartmentOptions = [
  { id: 1, value: "HR" },
  { id: 2, value: "Account" },
  { id: 3, value: "IT" },
  { id: 4, value: "Maintainence" },
  { id: 5, value: "Sales" },
  { id: 6, value: "R&D" },
];

const Profile = () => {
  const data = useSelector((state) => state.employee.currentUser);
  const [updateSelf, otherDetails] = useUpdateEmployeeMutation();
  const [updateByAdmin, otherStatus] = useUpdateEmployeeByAdminMutation();
  const [commonData, setCommonData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    dob: new Date(data.dob).toISOString().split("T")[0],
    doj: new Date(data.doj).toISOString().split("T")[0],
    deptId: data.deptId,
    wstId: data.wstId,
  });
  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    city: "",
    pincode: "",
    state: "",
    type: "current",
  });
  const [PermanentAddress, setPermanentAddress] = useState({
    street: "",
    city: "",
    pincode: "",
    state: "",
    type: "permanent",
  });

  useEffect(() => {
    if (data.Addresses.length > 0) {
      for (const address of data.Addresses) {
        if (address.type == "current") {
          let obj = {
            street: address.street,
            city: address.city,
            pincode: address.pincode,
            state: address.state,
            type: address.type,
          };
          setCurrentAddress(obj);
        }
        if (address.type == "permanent") {
          let obj = {
            street: address.street,
            city: address.city,
            pincode: address.pincode,
            state: address.state,
            type: address.type,
          };
          setPermanentAddress(obj);
        }
      }
    }
  }, []);

  const handleCommonChange = (e) => {
    const { name, value } = e.target;
    setCommonData({ ...commonData, [name]: value });
  };
  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;

    if (type == "current") {
      setCurrentAddress({ ...currentAddress, [name]: value });
      return;
    }
    setPermanentAddress({ ...PermanentAddress, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      ...commonData,
      current: currentAddress,
      permanent: PermanentAddress,
    };

    const reqBodyAdmin = {
      id: data.id,
      ...commonData,
      current: currentAddress,
      permanent: PermanentAddress,
    };

    if (data.roleId === 2) {
      console.log(reqBodyAdmin);
      const res = await updateByAdmin(reqBodyAdmin);
      return;
    }
    console.log(reqBody);
    const res = await updateSelf(reqBody);
    // console.log(res);
  };

  console.log({
    ...commonData,
    current: currentAddress,
    permanent: PermanentAddress,
  });
  console.log(data);
  console.log(currentAddress, PermanentAddress);

  return (
    <>
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="max-w-md mx-auto grid grid-cols-2 gap-4 "
        >
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              name="firstName"
              value={commonData.firstName}
              onChange={(e) => handleCommonChange(e)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              name="lastName"
              value={commonData.lastName}
              onChange={(e) => handleCommonChange(e)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={commonData.email}
              disabled={true}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="dateOfBirth"
              type="date"
              name="dob"
              value={commonData.dob}
              onChange={(e) => handleCommonChange(e)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="dateOfJoining"
            >
              Date of Joining
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="dateOfJoining"
              type="date"
              name="doj"
              value={commonData.doj}
              onChange={(e) => handleCommonChange(e)}
              disabled={true}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="department"
            >
              Department
            </label>

            {/* <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="department"
              type="text"
              name="department"
              value={commonData.deptId}
              disabled={true}

              // required
            /> */}
            <select
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="department"
              type="text"
              name="department"
              value={commonData.deptId}
              disabled={true}
            >
              <option value="">Select Work Status</option>

              {DepartmentOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="workStatus"
            >
              Work Status
            </label>

            <select
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="workStatus"
              name="wstId"
              value={commonData.wstId}
              onChange={(e) => handleCommonChange(e)}
              required
            >
              <option value="">Select Work Status</option>

              {WorkStatusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="currentStreet"
            >
              Current Street
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="currentStreet"
              type="text"
              name="street"
              value={currentAddress.street}
              onChange={(e) => handleAddressChange(e, "current")}
              data-addresstype="current"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="currentCity"
            >
              Current City
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="currentCity"
              type="text"
              name="city"
              value={currentAddress.city}
              onChange={(e) => handleAddressChange(e, "current")}
              data-addresstype="current"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="currentPincode"
            >
              Current Pincode
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="currentPincode"
              type="text"
              name="pincode"
              value={currentAddress.pincode}
              onChange={(e) => handleAddressChange(e, "current")}
              data-addresstype="current"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="currentState"
            >
              Current State
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="currentState"
              type="text"
              name="state"
              value={currentAddress.state}
              onChange={(e) => handleAddressChange(e, "current")}
              data-addresstype="current"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="permanentStreet"
            >
              Permanent Street
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="permanentStreet"
              type="text"
              name="street"
              value={PermanentAddress.street}
              onChange={(e) => handleAddressChange(e, "")}
              data-addresstype="permanent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="permanentCity"
            >
              Permanent City
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="permanentCity"
              type="text"
              name="city"
              value={PermanentAddress.city}
              onChange={(e) => handleAddressChange(e, "")}
              data-addresstype="permanent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="permanentPincode"
            >
              Permanent Pincode
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="permanentPincode"
              type="text"
              name="pincode"
              value={PermanentAddress.pincode}
              onChange={(e) => handleAddressChange(e, "")}
              data-addresstype="permanent"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="permanentState"
            >
              Permanent State
            </label>

            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="permanentState"
              type="text"
              name="state"
              value={PermanentAddress.state}
              onChange={(e) => handleAddressChange(e, "")}
              data-addresstype="permanent"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              className="px-4 py-2 h-10 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
