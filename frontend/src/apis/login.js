import axios from "axios";

export const login = async (reqData) => {
  const response = await axios.post("/login", reqData);
  return response.data;
};
