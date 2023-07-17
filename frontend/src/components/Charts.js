import React from "react";
import WorkStatusChart from "./common/WorkStatusChart";
import {
  useGetDepartmentRatioQuery,
  useGetGenderRatioQuery,
  useGetWorkStateRatioQuery,
} from "../services/employees";
// import NewChart from "./common/NewChart";

const Charts = () => {
  const { data: departmentData } = useGetDepartmentRatioQuery();
  const { data: genderRatio } = useGetWorkStateRatioQuery();
  const { data: workStates } = useGetGenderRatioQuery();

  return (
    <>
      <div className="allCharts">
        <div className="chart">
          <WorkStatusChart
            title="WorkState Data"
            data={workStates ? workStates : []}
          />
        </div>
        <div className="chart">
          <WorkStatusChart
            title="Gender Data"
            data={genderRatio ? genderRatio : []}
          />
        </div>
        <div className="chart">
          <WorkStatusChart
            title="Department Data"
            data={departmentData ? departmentData : []}
          />
        </div>
      </div>
    </>
  );
};

export default Charts;
