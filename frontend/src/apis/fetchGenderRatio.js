import axios from "axios";

export const fetchGenderRatio = async (setWorkStates) => {
  const response = await axios.get("/getGenderRatio");
  setWorkStates(response.data);
};
