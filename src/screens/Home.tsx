import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import FilterEmployeee from '../components/customComponents/CustomFieldFilter';
import EmployeesLists from '../components/EmployeesLists';

const Home = (props: any): JSX.Element => {
  const [employeeType, setEmployeeType] = useState('');
  return (
    <View style={styles.parentContanier}>
      <Header {...props} />
      <View style={styles.view}>
        <FilterEmployeee
          field={''}
          newForm={false}
          setEmployeeType={setEmployeeType}
        />
        <EmployeesLists {...props} employeeType={employeeType} />
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  parentContanier: {
    backgroundColor: '#faf0e6',
    flex: 1,
  },
  view: {
    paddingHorizontal: 10,
  },
});
