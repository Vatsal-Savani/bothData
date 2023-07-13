import React from "react";
import DashBoard from "../../components/DashBoard";

const EmployeeDashboard = () => {
  return (
    <>
      <div>
        <DashBoard isAdmin={false} />
      </div>
    </>
  );
};

export default EmployeeDashboard;
