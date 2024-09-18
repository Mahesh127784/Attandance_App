import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type Employee = {
  id: string;
  name: string;
  gender: string;
  field: string;
  joiningDate: string;
  joiningTime: string;
};

export type RootStackParamList = {
  Home: undefined;
  NewEmployeeForm: undefined;
  AttandancePage: undefined;
  TodayAttandanceChart: undefined;
  IndividualAttandance: undefined;
};

export type ActionDataType = {
  payload: Employee;
  type: string;
};
export type AttandanceModel = {
  id: string;
  attandance: boolean;
  date: string;
};

export type StateData = {Employee: {employee: Employee[]}};

// export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const data = [
  {label: 'All Employees', value: 'All'},
  {label: 'Front-end', value: 'Front-end'},
  {label: 'Back-end', value: 'Back-end'},
  {label: 'Tester', value: 'Tester'},
  {label: 'DevOps', value: 'DevOps'},
  {label: 'DataBase', value: 'DataBase'},
];
const formdata = [
  {label: 'Front-end', value: 'Front-end'},
  {label: 'Back-end', value: 'Back-end'},
  {label: 'Tester', value: 'Tester'},
  {label: 'DevOps', value: 'DevOps'},
  {label: 'DataBase', value: 'DataBase'},
];

export {data, formdata};
