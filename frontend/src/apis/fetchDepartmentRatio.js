import axios from "axios";

export const fetchDepartmentRatio = async (setDepartmentData) => {
  const response = await axios.get("/checkDepartment");
  setDepartmentData(response.data);
};
