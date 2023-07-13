import React from "react";
import DashBoard from "../../components/DashBoard";
import Charts from "../../components/Charts";

const AdminDashboard = () => {
  return (
    <>
      <div>
        <DashBoard isAdmin={true} />
      </div>
    </>
  );
};

export default AdminDashboard;
