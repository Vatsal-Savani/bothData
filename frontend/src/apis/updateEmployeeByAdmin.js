import axios from "axios";

export const updateEmployeeByAdmin = async (formData) => {
  const res = await axios.post("/adminUpdateEmployee", formData);

  return res;
};
