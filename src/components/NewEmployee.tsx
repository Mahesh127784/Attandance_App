import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AttandanceModel, Employee} from '../utils/types';
import {useSnackbar} from '../customHooks/useSnackbar';
import {useReconfirmation} from '../customHooks/useReconfirmation';
import CostomButton from './customComponents/CustomButton';
import {employees} from '../utils/rawData';
import {connect} from 'react-redux';
import {mapStateToProps} from '../utils/connectMethods';
import {
  DELETE,
  INDIVIDUAL_ATTANDANCE,
  NEW_EMPLOYEE_FORM,
  UPDATE,
} from '../utils/constants';

const NewEmployee = ({
  navigation,
  AttandanceData,
  employee,
  removeEmployee,
  AttandanceForm,
  attandanceList,
  setAttandanceList,
}: {
  navigation: any;
  AttandanceData: {};
  employee: Employee;
  removeEmployee: any;
  AttandanceForm: boolean;
  attandanceList: AttandanceModel[];
  setAttandanceList: any;
}) => {
  const {id, name, gender, field, joiningDate, joiningTime} = employee;

  const removeEmp = (empl: Employee) => {
    const remove = () => {
      removeEmployee(empl.id);

      useSnackbar(
        `successfully deleted employee ${
          empl.name + "'s"
        } data from the table...!`,
      );
    };

    useReconfirmation(
      `Delete employee ${empl.name + "'s"} data from the table?`,
      remove,
    );
  };

  const [attandance, setAttandance] = useState(false);

  const changeAttandance = () => {
    setAttandance(!attandance);

    const changedAttandance = attandanceList.map(emp => {
      if (emp.id === employee.id) {
        return {...emp, attandance: !emp.attandance};
      } else {
        return emp;
      }
    });

    setAttandanceList(changedAttandance);
  };

  useEffect(() => {
    attandanceList?.forEach(data => {
      if (data.id === employee.id) {
        console.log(10000000, data.attandance);

        setAttandance(data.attandance);
      }
    });
  });

  const employeeFields = employees(
    id,
    gender,
    field,
    joiningDate,
    joiningTime,
    AttandanceData,
  );

  const buttons = [
    {
      component: (
        <Text style={[styles.buttons, {backgroundColor: 'green'}]}>
          {UPDATE}
        </Text>
      ),
      action: () => navigation.navigate(NEW_EMPLOYEE_FORM, {data: employee}),
    },
    {
      component: (
        <Text style={[styles.buttons, {backgroundColor: 'red'}]}>{DELETE}</Text>
      ),
      action: () => removeEmp(employee),
    },
  ];

  return (
    <View style={styles.body}>
      {[id, name].map(text => (
        <View key={text}>
          <Text style={styles.bodyText}>{text}</Text>
        </View>
      ))}
      {!AttandanceForm && (
        <>
          {employeeFields.map(({value, width, attandance}) => (
            <View key={value}>
              {attandance ? (
                <CostomButton
                  InnerComponents={
                    <Text style={[styles.bodyText, width]}>{value}</Text>
                  }
                  style={{}}
                  action={() =>
                    navigation.navigate(INDIVIDUAL_ATTANDANCE, {
                      AttandanceData,
                      employee,
                    })
                  }
                />
              ) : (
                <Text style={[styles.bodyText, {width: width}]}>{value}</Text>
              )}
            </View>
          ))}
          <View style={[styles.bodyText, styles.costomBtn]}>
            {buttons.map(({component, action}, i) => (
              <CostomButton
                key={i}
                InnerComponents={component}
                action={() => action()}
                style={{}}
              />
            ))}
          </View>
        </>
      )}
      {AttandanceForm && (
        <CostomButton
          key={id}
          InnerComponents={<Text style={styles.checkmark}>✓</Text>}
          action={() => changeAttandance()}
          style={[
            styles.attendanceButton,
            {backgroundColor: attandance ? 'blue' : 'white'},
          ]}
        />
      )}
    </View>
  );
};

export default connect(mapStateToProps)(NewEmployee);

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyText: {
    paddingVertical: 15,
    color: '#000',
    width: 150,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    fontSize: 15,
  },
  buttons: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 13,
    color: '#fff',
    borderWidth: 1,
  },
  costomBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    width: 160,
    paddingStart: 10,
  },
  container: {
    width: 150,
    alignItems: 'center',
  },
  attendanceButton: {
    width: 25,
    borderRadius: 5,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginStart: 50,
  },
  checkmark: {
    color: 'white',
    textAlign: 'center',
  },
});
