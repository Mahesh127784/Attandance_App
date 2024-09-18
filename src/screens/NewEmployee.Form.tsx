import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FilterEmployeee from '../components/customComponents/CustomFieldFilter';
import {connect} from 'react-redux';
import {Employee} from '../utils/types';
import CustomCheckBox from '../components/customComponents/CustomCheckBox';
import CostomHeaderText from '../components/customComponents/CustomHeaderText';
import CostomInput from '../components/customComponents/CustomInput';
import {useSnackbar} from '../customHooks/useSnackbar';
import DateTimeInput from '../components/DateTimeInput';
import {mapDispatchToProps, mapStateToProps} from '../utils/connectMethods';
import {textInputs} from '../utils/rawData';
import {ADD_NEW_EMPLOYEE, HOME, SUBMIT} from '../utils/constants';

const NewEmployee = ({
  addEmployee,
  navigation,
  updateEmployee,
  empData,
  route,
}: any): JSX.Element => {
  // check box values finder
  const [genderType, setGenderType] = useState({
    Male: false,
    Female: false,
    Other: false,
  });

  //employee data from form
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    joiningDate: '',
    joiningTime: '',
  });

  const [field, setField] = useState();

  // employee form submit
  const handleSubmit = () => {
    const data = {...formData, field};

    let validData = true;
    // check for empty data from form
    for (const key in data) {
      if (data[key] === '' || data[key] === 'All') {
        validData = false;
        useSnackbar(`Please enter ${key} of the employee...!`);
        break;
      }
    }

    if (validData) {
      //checking if the old data is updating or new data is adding, by checking the id of the data with all the saved employees data
      const empType = empData?.filter(
        (emp: Employee) => emp?.id === formData.id,
      );

      //data sending to action reducer
      if (empType.length !== 0) {
        //updating the data
        updateEmployee(data);
        useSnackbar(`Updadted employee ${data.name} data successfully`);

        navigation.navigate(HOME);
      } else {
        //adding new data
        addEmployee(data);
        useSnackbar(
          `Added employee ${data.name} data successfully in the table`,
        );
        navigation.navigate(HOME);
      }
    }
  };

  useEffect(() => {
    //navigating to the form through updating purpous
    if (route?.params?.data) {
      // get the value from params sent through navigating page
      const {data} = route?.params;
      const {id, name, joiningDate, gender, joiningTime} = data;

      //set input form with employee data
      setFormData({
        id,
        name,
        joiningDate,
        joiningTime,
        gender,
      });
      setField(data.field);

      Object.keys(genderType).forEach(keyVal => {
        if (gender === keyVal) {
          setGenderType({...genderType, [keyVal]: true});
        }
      });
    }

    //new empl is adding
    else {
      //handling employee id dinamically according to previous employee id
      if (empData.length !== 0) {
        //making new emp id in incrementing order with previos emp id
        const prevId = Number(empData[empData.length - 1].id);
        const newId = String(prevId + 1);

        setFormData({...formData, id: newId});
      } else {
        //first employee is adding
        setFormData({...formData, id: '100'});
      }
    }
  }, [empData]);

  return (
    <View>
      <View style={styles.formHeader}>
        <CostomHeaderText
          screen={HOME}
          navigation={navigation}
          headerText={ADD_NEW_EMPLOYEE}
        />
      </View>
      <View style={styles.formContainer}>
        <View>
          {textInputs.map(({text, value}) => (
            <CostomInput
              key={value}
              setFormData={setFormData}
              formData={formData}
              value={formData[value]}
              dataType={text}
            />
          ))}
        </View>

        <View>
          <Text style={styles.inputHeading}>Gender *</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            {['Male', 'Female', 'Other'].map(gend => (
              <CustomCheckBox
                key={gend}
                setFormData={setFormData}
                formData={formData}
                setGenderType={setGenderType}
                inputHeading={styles.inputHeading}
                genderType={genderType}
                genderBox={gend}
              />
            ))}
          </View>
        </View>

        <FilterEmployeee field={field} setEmployeeType={setField} newForm />

        <DateTimeInput
          setFormData={setFormData}
          formData={formData}
          inputHeading={styles.inputHeading}
        />

        <Button title={SUBMIT} onPress={handleSubmit}></Button>
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee);

const styles = StyleSheet.create({
  formHeader: {
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: 'blue',
    height: 100,
  },
  textContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
  },
  backBtn: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    gap: 20,
    backgroundColor: '#faf0e6',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 30,
    margin: 30,
  },
  inputHeading: {color: 'black', padding: 5},
  inputDiv: {
    padding: 12,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },

  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 13,
  },
});
