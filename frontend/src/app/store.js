import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getEmployees } from "../services/employees";
import employeeSlice from "../slices/employeeSlice";

export const store = configureStore({
  reducer: {
    [getEmployees.reducerPath]: getEmployees.reducer,
    employee: employeeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getEmployees.middleware),
});

setupListeners(store.dispatch);
