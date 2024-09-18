import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomNullMessage = ({employeeType}: any) => {
  return (
    <Text style={styles.emptyEmpText}>
      No {employeeType === 'All' ? '' : employeeType} Employees Added!
    </Text>
  );
};

export default CustomNullMessage;

const styles = StyleSheet.create({
  emptyEmpText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 30,
  },
});
