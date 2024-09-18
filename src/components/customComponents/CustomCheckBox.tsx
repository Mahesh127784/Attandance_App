import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import CostomButton from './CustomButton';

const CustomCheckBox = ({
  inputHeading,
  formData,
  setFormData,
  setGenderType,
  genderType,
  genderBox,
}: any) => {
  const genderColour = () => {
    if (genderBox === 'Male') {
      return genderType.Male ? '#e60033' : 'white';
    } else if (genderBox === 'Female') {
      return genderType.Female ? '#ff1fd7' : 'white';
    } else {
      return genderType.Other ? 'black' : 'white';
    }
  };

  const genderChecked = () => {
    if (genderBox === 'Male') {
      setGenderType({Male: !genderType.Male, Female: false, Other: false});
      setFormData({...formData, gender: genderType.Male ? '' : 'Male'});
    } else if (genderBox === 'Female') {
      setGenderType({Male: false, Female: !genderType.Female, Other: false});
      setFormData({...formData, gender: genderType.Female ? '' : 'Female'});
    } else {
      setGenderType({Male: false, Female: false, Other: !genderType.Other});
      setFormData({...formData, gender: genderType.Other ? '' : 'Other'});
    }
  };

  return (
    <View style={styles.btnContanier}>
      <Text style={inputHeading}>{genderBox}</Text>
      <CostomButton
        InnerComponents={<Text style={styles.tickIcon}>✓</Text>}
        action={() => genderChecked()}
        style={[styles.radiobtn, {backgroundColor: genderColour()}]}
      />
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  btnContanier: {flexDirection: 'row', alignItems: 'center', gap: 5},
  radiobtn: {
    width: 25,
    borderRadius: 5,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
  },
  tickIcon: {color: 'white', textAlign: 'center'},
});
