import axios from "axios";
import { setAllEmployees } from "../slices/employeeSlice";

export const fetchAllEmployees = async (dispatch) => {
  const res = await axios.get("/getalldata");
  dispatch(setAllEmployees(res.data));
  return res;
};
