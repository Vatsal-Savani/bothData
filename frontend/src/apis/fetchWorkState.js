import axios from "axios";

export const fetchWorkState = async (setdata) => {
  const response = await axios.get("/getWorkStatusRatio");
  setdata(response.data);
};
