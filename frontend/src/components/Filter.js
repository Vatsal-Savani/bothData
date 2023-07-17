import React from "react";
import {
  filterOptions,
  WorkStatuss,
  Genders,
  Departments,
  Roles,
} from "../shared/dropdowns";

const Filter = ({
  filterBy,
  filterByType,
  setFilterBy,
  setFilterByType,
  globalSearch,
  setGlobalSearch,
}) => {
  const Gender = Genders;
  const Role = Roles;
  const Department = Departments;
  const WorkStatus = WorkStatuss;

  const handleFilterChange = async (e) => {
    setFilterBy(e.target.value);
    setFilterByType("");
  };

  return (
    <>
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
    </>
  );
};

export default Filter;
