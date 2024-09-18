import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {data, formdata} from '../../utils/types';

const FilterEmployeee = ({
  setEmployeeType,
  newForm,
  field,
}: {
  setEmployeeType: Dispatch<SetStateAction<string>>;
  newForm?: boolean;
  field: string;
}) => {
  const [value, setValue] = useState('All');

  useEffect(() => {
    //adding the specific type of employees according to the dropdown input
    if (field && value === 'All') {
      //for updating form adding the type of emplyee from the data
      setEmployeeType(field);
    } else {
      //default type is All it not changed
      setEmployeeType(value);
    }
  }, [value, field]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Field Of The Employee {newForm ? '*' : ':'}
      </Text>

      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholder="Working Field"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          data={newForm ? formdata : data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..."
          value={newForm ? (field ? field : '') : value}
          onChange={item => {
            setValue(item.value);
          }}
        />
      </View>
    </View>
  );
};

export default FilterEmployeee;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  label: {
    color: 'black',
    fontSize: 15,
  },
  dropdownContainer: {
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    width: 150,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
  },
  placeholderStyle: {
    color: 'gray',
    fontSize: 14,
    marginStart: 8,
  },
  selectedTextStyle: {
    color: 'black',
    marginStart: 10,
    fontSize: 13,
  },
  inputSearchStyle: {
    color: 'black',
    fontSize: 14,
  },
  itemTextStyle: {
    color: 'black',
    fontSize: 14,
  },
});
