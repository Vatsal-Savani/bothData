import React from "react";
import { useDeleteEmployeeMutation } from "../services/employees";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EmployeeTable = ({
  isAdmin,
  setOpen,
  setAction,
  setFormData,
  rows,
  filterBy,
  filterByType,
  globalSearch,
}) => {
  const [deleteEmployee, responseState] = useDeleteEmployeeMutation();

  const handleEdit = (e, row) => {
    setOpen(true);
    setAction("edit");
    setFormData({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      gender: row.gender,
      email: row.email,
      phone: row.phone,
      deptId: row.deptId,
      wstId: row.wstId,
      roleId: row.roleId,
      doj: row.doj ? new Date(row.doj).toISOString().split("T")[0] : "",
    });
  };

  const handleDelete = async (e) => {
    deleteEmployee(e.target.id);
  };

  return (
    <>
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
                    if (filterByType == "") return employee;
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
    </>
  );
};

export default EmployeeTable;
