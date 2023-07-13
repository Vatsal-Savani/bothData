import axios from "axios"

export const registerEmployee = async (employeeData) => {
    const res = await axios.post("/register", employeeData);
    console.log(res)

}
