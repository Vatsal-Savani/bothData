import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import { registerEmployee } from "../../apis/registerEmployee";
import { updateEmployeeByAdmin } from "../../apis/updateEmployeeByAdmin";
import { useUpdateEmployeeByAdminMutation } from "../../services/employees";

const WorkStatusOptions = [
  { id: 1, value: "Work from Home" },
  { id: 2, value: "Work from Office" },
  { id: 3, value: "Full Leave" },
  { id: 4, value: "Half Leave" },
];

const DepartmentOptions = [
  { id: 1, value: "HR" },
  { id: 2, value: "Account" },
  { id: 3, value: "IT" },
  { id: 4, value: "Maintainence" },
  { id: 5, value: "Sales" },
  { id: 6, value: "R&D" },
];

const GenderOptions = [
  { id: 1, value: "male" },
  { id: 2, value: "female" },
];

const RoleOptions = [
  { id: 1, value: "Employee" },
  { id: 2, value: "Admin" },
];

const initialData = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  phone: "",
  password: "",
  deptId: "",
  wstId: "",
};

export default function Form({
  open,
  setOpen,
  action,
  setAction,
  formData,
  setFormData,
}) {
  const [updateByAdmin, otherstates] = useUpdateEmployeeByAdminMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (action === "create") {
      try {
        const response = await registerEmployee(formData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setOpen(false);
      return;
    }
    formData.doj = new Date(formData.doj).toISOString();
    const response = await updateByAdmin(formData);
    console.log(response);

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => {
          setOpen(true);
          setAction("create");
          setFormData(initialData);
        }}
        style={{ display: "flex", marginBottom: "1vh" }}
      >
        Add Employee
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            {action == "create" ? "Create New Employee" : "Edit Employee"}
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Fill in the information of the Employee.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </FormControl>

              {action === "create" && (
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoFocus
                    required
                  />
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </FormControl>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="role"
                >
                  Role
                </label>

                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="role"
                  name="role"
                  value={formData?.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>

                  {RoleOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="dateOfJoining"
                >
                  Date of Joining
                </label>

                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="dateOfJoining"
                  type="date"
                  name="doj"
                  value={formData?.doj}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="workStatus"
                >
                  Gender
                </label>

                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="workStatus"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>

                  {GenderOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="workStatus"
                >
                  Department
                </label>

                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="workStatus"
                  name="deptId"
                  value={formData.deptId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>

                  {DepartmentOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="workStatus"
                >
                  Work Status
                </label>

                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="workStatus"
                  name="wstId"
                  value={formData.wstId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Work Status</option>

                  {WorkStatusOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
              <Button style={{ backgroundColor: "#096bde" }} type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
