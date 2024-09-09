import { createSlice } from "@reduxjs/toolkit";
import { Employee, ActionDataType } from "../../../types";

const initialState: Employee[] =
  []


export const employeeSlice = createSlice({
  name: "employees",
  initialState,

  reducers: {
    addEmployees: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
