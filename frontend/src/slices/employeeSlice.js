import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userRole: 1,
  allEmployees: [],
  currentUser: {},
};

export const employeeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setAllEmployees: (state, action) => {
      state.allEmployees = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLogin,
  setLogout,
  setUserRole,
  setAllEmployees,
  setCurrentUser,
} = employeeSlice.actions;

export default employeeSlice.reducer;
