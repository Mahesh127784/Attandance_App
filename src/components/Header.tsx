import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CostomButton, {AddButton} from './customComponents/CustomButton';
import {
  ATTANDANCE_PAGE,
  ATTANDANCE_PAGE_NAVIGATE,
  EMPLOYEES_DATA,
} from '../utils/constants';

const Header = (props: any): JSX.Element => {
  const {navigation} = props;

  const attPage = {
    component: <Text style={styles.attendanceText}>{ATTANDANCE_PAGE}</Text>,
    action: () => navigation.navigate(ATTANDANCE_PAGE_NAVIGATE),
  };

  return (
    <View style={styles.topSection}>
      <Text style={styles.topHeading}>{EMPLOYEES_DATA}</Text>
      <View style={styles.buttonContainer}>
        <AddButton {...props} />

        <CostomButton
          InnerComponents={attPage.component}
          style={styles.attendanceButton}
          action={attPage.action}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: 'blue',
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  topHeading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    marginStart: 20,
    flexDirection: 'row',
    gap: 30,
  },
  button: {
    paddingVertical: 8,
    backgroundColor: 'white',
    width: 90,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  addIcon: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  addText: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  attendanceButton: {
    width: 170,
    paddingVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  attendanceText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    width: 170,
  },
});

export default Header;
