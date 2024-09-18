import {getToday} from 'react-native-modern-datepicker';
import {Employee} from '../../utils/types';
import {
  ADD_UPDATE_EMPLOYEE,
  ADD_EMPLOYEE_ATTANDANCE,
  REMOVE_EMPLOYEE,
} from '../actionTypes/employeeTypes';
import {deleteEmpl, updateEmp} from './actionCreators/actionCreators';

const getstateValue = (state: any) => state().Employee.employee;

export const addEmployee = (employee: Employee) => {
  return (dispatch: any, getState: any) => {
    const state: Employee[] = getstateValue(getState) || [];

    const changedState = [...state, employee];

    dispatch({
      type: ADD_UPDATE_EMPLOYEE,
      payload: changedState,
    });
  };
};

export const removeEmployee = (id: string) => {
  return (dispatch: any, getState: any) => {
    const state = getstateValue(getState) || [];
    const updatedstate = deleteEmpl(id, state);

    dispatch({
      type: REMOVE_EMPLOYEE,
      payload: updatedstate,
    });
  };
};

export const updateEmployee = (employee: Employee) => {
  return (dispatch: any, getState: any) => {
    const state = getstateValue(getState) || [];

    const upDatedSate = updateEmp(employee, state);

    dispatch({
      type: ADD_UPDATE_EMPLOYEE,
      payload: upDatedSate,
    });
  };
};

export const addAttandance = (attandance: []) => {
  return (dispatch: any, getState: any) => {
    const state = getState().Employee.employeeAttandanceList || {};
    console.log(143, attandance);

    const updatedAttandace = {...state, [getToday()]: attandance};

    dispatch({
      type: ADD_EMPLOYEE_ATTANDANCE,
      payload: updatedAttandace,
    });
  };
};
