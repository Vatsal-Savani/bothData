import React from "react";
import WorkStatusChart from "./common/WorkStatusChart";
import {
  useGetDepartmentRatioQuery,
  useGetGenderRatioQuery,
  useGetWorkStateRatioQuery,
} from "../services/employees";
import NewChart from "./NewChart";

const Charts = () => {
  const { data: departmentData } = useGetDepartmentRatioQuery();
  const { data: genderRatio } = useGetWorkStateRatioQuery();
  const { data: workStates } = useGetGenderRatioQuery();

  return (
    <>
      <div>
        <WorkStatusChart data={workStates ? workStates : []} />
        <WorkStatusChart data={genderRatio ? genderRatio : []} />
        <WorkStatusChart data={departmentData ? departmentData : []} />
      </div>
    </>
  );
};

export default Charts;
