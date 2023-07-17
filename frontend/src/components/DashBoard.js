import { useEffect, useState } from "react";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import Form from "./common/Form";
import { useGetAllEmployeesQuery } from "../services/employees";
import Filter from "./Filter";
import EmployeeTable from "./EmployeeTable";

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
    roleId: "",
    doj: "",
  });
  const isAdminn = isAdmin;
  const [open, setOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [filterByType, setFilterByType] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [action, setAction] = useState("");
  const [rows, setRows] = useState([]);

  const { data } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

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
          <Filter
            filterBy={filterBy}
            filterByType={filterByType}
            setFilterBy={setFilterBy}
            setFilterByType={setFilterByType}
            globalSearch={globalSearch}
            setGlobalSearch={setGlobalSearch}
          />
          <EmployeeTable
            open={open}
            isAdmin={isAdminn}
            setOpen={setOpen}
            setAction={setAction}
            formData={formData}
            setFormData={setFormData}
            rows={rows}
            filterBy={filterBy}
            filterByType={filterByType}
            globalSearch={globalSearch}
          />
        </div>
      </div>
    </>
  );
}
