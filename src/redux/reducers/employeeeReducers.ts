import { Employee } from '../../types'
import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, UPDATE_EMPLOYEE } from '../actionTypes/employeeTypes'



const InitialSate: { employee: Employee[] } = {
    employee: [],
}

const EmployeeReducer = (state = InitialSate, action: { type: string, payload: Employee | string }) => {

    switch (action.type) {
        case ADD_EMPLOYEE:
            //adding new emp data to the state
            return {
                employee: [...state.employee, action.payload as Employee]
            }
        case REMOVE_EMPLOYEE:
            // removing the employee by filter method
            return {
                employee: state.employee.filter(emp => emp.id !== action.payload)
            }
        // case UPDATE_EMPLOYEE:
        //     console.log('updadting state', action.payload);

        //     const index = state.employee.findIndex((emp) => emp.id === action.payload.id);
        //     console.log(index, 'testing id');

        //     return {
        //         employee: state.employee.splice(index, 1, action.payload as Employee)
        //     }
        case UPDATE_EMPLOYEE:

            // update with new employee data with old data
            const upDatedSate = state.employee.map(emp => {

                //finding the updating employee from the state and updating it with new data
                if (emp.id === action.payload.id) {

                    return {
                        ...emp,
                        name: action.payload.name,
                        gender: action.payload.gender,
                        field: action.payload.field,
                        joiningDate: action.payload.joiningDate,
                        joiningTime: action.payload.joiningTime,
                    }
                } else {
                    return emp
                }
            })
            return {
                employee: upDatedSate
            }

        default:
            return state
    }
}

export default EmployeeReducer;