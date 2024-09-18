import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const CustomText = ({style, placeholder, defaultValue}: any) => {
  return (
    <TextInput
      readOnly
      placeholderTextColor="gray"
      style={[styles.datePickers, style]}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default CustomText;

const styles = StyleSheet.create({
  datePickers: {
    padding: 12,
    backgroundColor: 'white',
    width: 150,
    textAlign: 'center',
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
});
