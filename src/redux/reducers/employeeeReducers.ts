import {AttandanceModel, Employee} from '../../utils/types';
import {
  ADD_UPDATE_EMPLOYEE,
  ADD_EMPLOYEE_ATTANDANCE,
  REMOVE_EMPLOYEE,
} from '../actionTypes/employeeTypes';

const InitialSate: {employee: Employee[]; employeeAttandanceList: {}} = {
  employee: [],
  employeeAttandanceList: {},
};

const EmployeeReducer = (
  state = InitialSate,
  action: {type: string; payload: Employee | string | {}},
) => {
  switch (action.type) {
    case ADD_UPDATE_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
      };
    case REMOVE_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
      };
    case ADD_EMPLOYEE_ATTANDANCE:
      return {
        ...state,
        employeeAttandanceList: action.payload,
      };

    default:
      return state;
  }
};

export default EmployeeReducer;
