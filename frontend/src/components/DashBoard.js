import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
// import { deleteEmployee } from "../apis/deleteEmployee";
import Form from "./common/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
  useLogoutMutation,
} from "../services/employees";
import { setCurrentUser, setLogout } from "../slices/employeeSlice";

const filterOptions = [
  { id: 1, value: "Gender" },
  { id: 2, value: "Department" },
  { id: 3, value: "WorkStatus" },
  { id: 4, value: "Role" },
];

const WorkStatus = [
  { id: 1, value: "WFH" },
  { id: 2, value: "WFO" },
  { id: 3, value: "FULL TIME" },
  { id: 4, value: "HALF TIME" },
];

const Department = [
  { id: 1, value: "HR" },
  { id: 2, value: "Account" },
  { id: 3, value: "IT" },
  { id: 4, value: "Maintainence" },
  { id: 5, value: "Sales" },
  { id: 6, value: "R&D" },
];

const Gender = [
  { id: 1, value: "male" },
  { id: 2, value: "female" },
];
const Role = [
  { id: 1, value: "Employee" },
  { id: 2, value: "Admin" },
];

export default function DashBoard({ isAdmin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    deptId: "",
    wstId: "",
    role: "",
    doj: "",
  });
  const [open, setOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [filterByType, setFilterByType] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [action, setAction] = useState("");
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [deleteEmployee, responseState] = useDeleteEmployeeMutation();

  const { data } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  const handleEdit = (e, row) => {
    setOpen(true);
    setAction("edit");

    setFormData({
      id: e.target.id,
      firstName: row.firstName,
      lastName: row.lastName,
      gender: row.gender,
      email: row.email,
      phone: row.phone,
      deptId: row.deptId,
      wstId: row.wstId,
      role: row.roleId,
      doj: row.doj ? new Date(row.doj).toISOString().split("T")[0] : "",
    });
  };

  const handleDelete = async (e) => {
    console.log(e.target.id);
    deleteEmployee(e.target.id);
  };

  const handleFilterChange = async (e) => {
    setFilterBy(e.target.value);
    setFilterByType("");
  };

  console.log(formData.role);

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <div>
          {isAdmin && (
            <StyledEngineProvider injectFirst>
              <CssVarsProvider>
                <Form
                  open={open}
                  setOpen={setOpen}
                  action={action}
                  setAction={setAction}
                  formData={formData}
                  setFormData={setFormData}
                />
              </CssVarsProvider>
            </StyledEngineProvider>
          )}
          <div className="flex space-x-3">
            <div className="mb-4 flex items-center space-x-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="filter"
              >
                Filter-By :
              </label>

              <select
                className="w-25 h-10 px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="filter"
                name="filter"
                value={filterBy}
                onChange={(e) => handleFilterChange(e)}
              >
                <option value="">Select Filter</option>

                {filterOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="filter"
              >
                type :
              </label>

              <select
                className="w-25 h-10 px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="filter"
                name="filter"
                value={filterByType}
                onChange={(e) => setFilterByType(e.target.value)}
              >
                <option value="">Select Filter</option>
                {console.log([filterBy])}
                {eval(filterBy)?.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="search"
              >
                Search :
              </label>

              <input
                className="w-25 h-10 px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="serach"
                type="text"
                name="search"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </div>
          </div>
          <TableContainer component={Paper} style={{ width: 1400 }}>
            <Table sx={{ minWidth: 1200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">id</TableCell>
                  <TableCell align="center">firstName</TableCell>
                  <TableCell align="center">lastName</TableCell>
                  <TableCell align="center">email</TableCell>
                  <TableCell align="center">gender</TableCell>
                  <TableCell align="center">phone</TableCell>
                  <TableCell align="center">dob</TableCell>
                  <TableCell align="center">doj</TableCell>
                  <TableCell align="center">deptId</TableCell>
                  <TableCell align="center">wstId</TableCell>
                  <TableCell align="center">roleId</TableCell>
                  {isAdmin && <TableCell align="right">edit</TableCell>}
                  {isAdmin && <TableCell align="right">remove</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .filter((employee) => {
                      if (filterBy.length === 0) {
                        return employee;
                      } else if (filterBy == "Department") {
                        return employee?.Department?.departmentName
                          .toLowerCase()
                          .includes(filterByType.toLowerCase());
                      } else if (filterBy == "WorkStatus") {
                        return employee?.WorkStatus?.workState
                          .toLowerCase()
                          .includes(filterByType.toLowerCase());
                      } else if (filterBy == "Gender") {
                        return employee?.gender
                          .toLowerCase()
                          .includes(filterByType.toLowerCase());
                      } else if (filterBy == "Role") {
                        let role = filterByType == "Admin" ? 2 : 1;
                        return employee?.roleId == role;
                      }
                    })
                    .filter((employee) => {
                      return (
                        employee.firstName
                          .toLowerCase()
                          .includes(globalSearch.toLowerCase()) ||
                        employee.lastName
                          .toLowerCase()
                          .includes(globalSearch.toLowerCase()) ||
                        employee.email
                          .toLowerCase()
                          .includes(globalSearch.toLowerCase()) ||
                        employee.gender
                          .toLowerCase()
                          .includes(globalSearch.toLowerCase())
                      );
                    })
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.firstName}</TableCell>
                        <TableCell align="right">{row.lastName}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.gender}</TableCell>
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right">
                          {row.dob === null
                            ? ""
                            : new Date(row.doj).toUTCString().slice(0, 16)}
                        </TableCell>
                        <TableCell align="right">
                          {row.doj === null
                            ? ""
                            : new Date(row.doj).toUTCString().slice(0, 16)}
                        </TableCell>
                        <TableCell align="right">
                          {row?.Department?.departmentName}
                        </TableCell>
                        <TableCell align="right">
                          {row?.WorkStatus?.workState}
                        </TableCell>
                        {/* <TableCell align="right">
                    <span>{row.Role.role}</span>
                  </TableCell> */}

                        <TableCell align="right">
                          {row.Role.role === "admin" ? (
                            <span className="bg-green-300 font-bold p-1 rounded-sm">
                              Admin
                            </span>
                          ) : (
                            <span className="bg-gray-200 font-bold p-1 rounded-sm">
                              Employee
                            </span>
                          )}
                        </TableCell>

                        {isAdmin && (
                          <>
                            <TableCell align="right">
                              <button
                                id={row.id}
                                onClick={(e) => handleEdit(e, row)}
                                style={{ cursor: "pointer" }}
                                type="submit"
                                className="flex w-full  fo justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit
                              </button>
                            </TableCell>
                            <TableCell align="right">
                              <button
                                id={row.id}
                                onClick={(e) => handleDelete(e)}
                                style={{ cursor: "pointer" }}
                                type="submit"
                                className="flex w-full  fo justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Delete
                              </button>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
