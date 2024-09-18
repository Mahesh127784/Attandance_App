import {Employee} from '../../../utils/types';

export const deleteEmpl = (id: string, state: Employee[]) =>
  state.filter(emp => emp.id !== id);

export const updateEmp = (employ: Employee, state: Employee[]) => {
  return state.map(emp => {
    //finding the updating employee from the state and updating it with new data
    if (emp.id === employ.id) {
      return {
        ...emp,
        name: employ.name,
        gender: employ.gender,
        field: employ.field,
        joiningDate: employ.joiningDate,
        joiningTime: employ.joiningTime,
      };
    } else {
      return emp;
    }
  });
};
