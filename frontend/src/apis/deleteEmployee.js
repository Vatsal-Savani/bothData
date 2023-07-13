import axios from "axios";

export const deleteEmployee = async (id) => {
  console.log(id);
  const res = await axios.post("/deleteEmployee", {
    id: id,
  });

  return res;
};
