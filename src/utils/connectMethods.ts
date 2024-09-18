import {
  addAttandance,
  addEmployee,
  removeEmployee,
  updateEmployee,
} from '../redux';
import {Employee} from './types';

export const mapStateToProps = (state: {
  Employee: {employee: Employee[]; employeeAttandanceList: {}};
}) => {
  return {
    empData: state?.Employee?.employee || [],
    AttandanceData: state?.Employee?.employeeAttandanceList || {},
  };
};

export const mapDispatchToProps = {
  addEmployee,
  updateEmployee,
  removeEmployee,
  addAttandance,
};
