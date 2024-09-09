import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./features/employees/employee";

export const store = configureStore({
  reducer: {
    employees: employeeReducer
  },
});
