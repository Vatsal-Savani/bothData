import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const WorkStatusChart = ({ data }) => {
  return (
    <div>
      <PieChart
        series={[
          {
            data: data,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

export default WorkStatusChart;
