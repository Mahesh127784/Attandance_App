import {AttandanceModel} from './types';

export const headerData = [
  {text: 'Employee Id', width: 150},
  {text: 'Name', width: 150},
  {text: 'Gender', width: 150},
  {text: 'Field of Work', width: 150},
  {text: 'Joining date and time', width: 230},
  {text: 'Attendance %', width: 150},
  {text: 'Actions', width: 180},
];

export const attandanceCalcy = (AttandanceData: {}, id: string) => {
  const workingDays = Object.keys(AttandanceData);
  let attandance = 0;

  workingDays.forEach(day => {
    const attendanceRecords = AttandanceData[day];
    const employee = attendanceRecords.find(
      (data: AttandanceModel) => data.id === id,
    );
    if (employee?.attandance) {
      attandance++;
    }
  });
  return {workingDays: workingDays.length, attandance};
};

export const employees = (
  id: string,
  gender: string,
  field: string,
  joiningDate: string,
  joiningTime: string,
  AttandanceData: {},
) => {
  const {attandance, workingDays} = attandanceCalcy(AttandanceData, id);

  return [
    {value: gender, width: 150},
    {value: field, width: 150},
    {value: joiningDate + ' - ' + joiningTime, width: 230},
    {
      value: `${((attandance / workingDays) * 100).toFixed(0)}%`,
      width: {textDecorationLine: 'underline', width: 150},
      attandance: true,
    },
  ];
};

export const textInputs = [
  {text: 'Employer Id', value: 'id'},
  {text: 'Name', value: 'name'},
];
