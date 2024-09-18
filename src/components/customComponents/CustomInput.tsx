import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomInput = ({
  value,
  dataType,
  formData,
  setFormData,
}: {
  setFormData: any;
  formData: any;
  value: string;
  dataType: string;
}) => {
  const inputType = dataType === 'Employer Id';
  return (
    <View>
      <Text style={styles.inputHeading}>{dataType} *</Text>
      <TextInput
        style={[styles.inputDiv, inputType ? styles.id : {}]}
        readOnly={inputType ? true : false}
        defaultValue={value}
        placeholderTextColor="gray"
        placeholder="Employee Name"
        onChangeText={newText =>
          setFormData({...formData, [inputType ? 'id' : 'name']: newText})
        }
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  id: {paddingStart: 20, backgroundColor: 'lightgray'},
  inputHeading: {color: 'black', padding: 5},
  inputDiv: {
    padding: 12,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
});
