import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getEmployees = createApi({
  reducerPath: "getEmployees",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["employees"],
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => ({
        url: "getalldata",
        // method : "GET" . //--> you can ignore it if it is get request
      }),
      providesTags: ["employees"],
    }),
    getGenderRatio: builder.query({
      query: () => ({
        url: "getGenderRatio",
      }),
      providesTags: ["employees"],
    }),
    getDepartmentRatio: builder.query({
      query: () => ({
        url: "checkDepartment",
      }),
      providesTags: ["employees"],
    }),
    getWorkStateRatio: builder.query({
      query: () => ({
        url: "getWorkStatusRatio",
      }),
      providesTags: ["employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: "deleteEmployee",
        method: "POST",
        body: {
          id: id,
        }, //--> you can ignore it if it is get request
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["employees"],
    }),
    updateEmployee: builder.mutation({
      query: (reqBody) => ({
        url: "updateEmployee",
        method: "POST",
        body: reqBody,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["employees"],
    }),
    updateEmployeeByAdmin: builder.mutation({
      query: (formData) => ({
        url: "adminUpdateEmployee",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["employees"],
    }),
    login: builder.mutation({
      query: (reqData) => ({
        url: "login",
        method: "POST",
        body: reqData,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["employees"],
    }),
    logout: builder.mutation({
      query: (id) => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["employees"],
    }),
    register: builder.mutation({
      query: (employeeData) => ({
        url: "register",
        method: "POST",
        body: employeeData,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["employees"],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useUpdateEmployeeByAdminMutation,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetDepartmentRatioQuery,
  useGetWorkStateRatioQuery,
  useGetGenderRatioQuery,
} = getEmployees;
