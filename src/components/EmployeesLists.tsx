import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewEmployee from './NewEmployee';
import {Employee} from '../utils/types';
import {connect} from 'react-redux';
import {headerData} from '../utils/rawData';
import {mapDispatchToProps, mapStateToProps} from '../utils/connectMethods';
import CustomNullMessage from './customComponents/CustomNullMessage';

const EmployeesLists = ({
  employeeType,
  empData,
  removeEmployee,
  navigation,
}: {
  navigation: any;
  employeeType: string;
  empData: Employee[];
  removeEmployee: (id: string) => {};
}): JSX.Element => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    //if desired empl field is all, show all the employes from the data
    if (employeeType === 'All') {
      setEmployees(empData);
    } else {
      //if specific field of employees needed, filter the employees based on the desred field
      const emp = empData?.filter(emp => emp?.field === employeeType);
      setEmployees(emp);
    }
  }, [employeeType, empData]);

  return (
    <View>
      <ScrollView horizontal>
        <View style={styles.container}>
          <View style={styles.header}>
            {headerData.map(({text, width}) => (
              <View key={text}>
                <Text style={[styles.headingText, {width: width}]}>{text}</Text>
              </View>
            ))}
          </View>
          <ScrollView style={styles.scrollView}>
            {employees.length !== 0 ? (
              employees.map((employee: Employee) => (
                <NewEmployee
                  key={employee.id}
                  navigation={navigation}
                  AttandanceForm={false}
                  attandanceList={[]}
                  setAttandanceList={false}
                  employee={employee}
                  removeEmployee={removeEmployee}
                />
              ))
            ) : (
              <CustomNullMessage employeeType={employeeType} />
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesLists);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    marginEnd: 20,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#F8F8FF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  headingText: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    fontSize: 14,
  },
  scrollView: {height: 500, backgroundColor: 'white'},
});
