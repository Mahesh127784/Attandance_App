import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NEW_EMPLOYEE_FORM} from '../../utils/constants';

export default function CustomButton({
  action,
  InnerComponents,
  style,
}: {
  action: () => void;
  InnerComponents: JSX.Element;
  style: {};
}) {
  return (
    <TouchableOpacity onPress={action} style={style}>
      {InnerComponents}
    </TouchableOpacity>
  );
}

export function AddButton({navigation}: any) {
  return (
    <CustomButton
      InnerComponents={
        <>
          <Text style={styles.addText}>New</Text>
          <Text style={styles.addIcon}>+</Text>
        </>
      }
      action={() => navigation.navigate(NEW_EMPLOYEE_FORM)}
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  addIcon: {color: 'black', fontSize: 20, fontWeight: '500'},
  addText: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    paddingVertical: 8,
    backgroundColor: 'white',
    width: 90,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
});
