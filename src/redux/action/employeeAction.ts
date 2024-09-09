import employee from '../../redux-toolkit/features/employees/employee';
import { Employee } from '../../types';
import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE } from '../actionTypes/employeeTypes';

export const addEmployee = (employee: Employee) => {
    return {
        type: ADD_EMPLOYEE,
        payload: employee
    }
}

export const removeEmployee = (employeeId: string) => {
    return {
        type: REMOVE_EMPLOYEE,
        payload: employeeId
    }
}

export const updateEmployee = (employee: Employee) => {
    return {
        type: UPDATE_EMPLOYEE,
        payload: employee
    }
}

