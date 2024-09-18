import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewEmployee from '../components/NewEmployee';
import {AttandanceModel, Employee} from '../utils/types';
import {connect} from 'react-redux';
import FilterEmployeee from '../components/customComponents/CustomFieldFilter';
import {getToday} from 'react-native-modern-datepicker';
import {useSnackbar} from '../customHooks/useSnackbar';
import CostomHeaderText from '../components/customComponents/CustomHeaderText';
import CostomButton, {
  AddButton,
} from '../components/customComponents/CustomButton';
import {mapDispatchToProps, mapStateToProps} from '../utils/connectMethods';
import {
  ATTANDANCE_PAGE,
  ATTANDANCE_CHART,
  SUBMIT,
  HOME,
  TODAY_ATTANDANCE_CHART,
} from '../utils/constants';
import CustomNullMessage from '../components/customComponents/CustomNullMessage';
import CustomModal from '../components/customComponents/CustomModal';
import moment from 'moment';

const AttandancePage = ({
  empData,
  AttandanceData,
  navigation,
  addAttandance,
}: {
  empData: Employee[];
  AttandanceData: {};
  addAttandance: Function;
  navigation: any;
}): JSX.Element => {
  const [dateSelector, setDateSelector] = useState('Recent Data');
  const [recentDate, setRecentDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [desiredData, setDesiredData] = useState();

  const today = getToday();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeType, setEmployeeType] = useState('');

  const [attandance, setAttandance] = useState<AttandanceModel[]>([]);

  const submitAttandance = () => {
    const selectedDate = moment(date).format('YYYY/MM/DD');

    if (selectedDate !== today) {
      useSnackbar(`You Can't Modify The Old Attandance Data...!`);
    } else {
      if (empData.length !== 0) {
        addAttandance(attandance);
        useSnackbar(`Todays attandance added succefully `);
        navigation.navigate(TODAY_ATTANDANCE_CHART);
      } else {
        useSnackbar(`No Employees found to add attandance`);
      }
    }
  };

  const oldAttendanceFinder = (istDate: string, date: Date) => {
    const desiredDay = AttandanceData[istDate];

    if (desiredDay) {
      setDesiredData(desiredDay);
      setDate(new Date(date));
      setDateSelector(istDate === today ? 'Today' : istDate);
    } else {
      useSnackbar('No Data Available Of This Date');
    }
    setRecentDate(false);
  };

  useEffect(() => {
    if (!desiredData) {
      const data: AttandanceModel[] | undefined = AttandanceData[today];

      if (data?.length && data.length === empData.length) {
        setAttandance(data);
      } else {
        const newAttaList = empData.map(emp => ({
          id: emp.id,
          attandance: false,
          date: today,
        }));
        setAttandance(newAttaList);
      }
      if (employeeType === 'All') {
        setEmployees(empData);
      } else {
        const emp = empData?.filter(emp => emp?.field === employeeType);
        setEmployees(emp);
      }
    } else setAttandance(desiredData);
  }, [employeeType, AttandanceData, desiredData]);
  console.log(attandance);

  return (
    <>
      <View style={styles.topSection}>
        <CostomHeaderText
          navigation={navigation}
          headerText={ATTANDANCE_PAGE}
          screen={HOME}
        />
        <View style={styles.btnContainer}>
          <AddButton navigation={navigation} />
          <CostomButton
            key={'oldattandancebtn'}
            InnerComponents={
              <>
                <Text style={[styles.addText, {paddingHorizontal: 0}]}>
                  {dateSelector}
                </Text>
              </>
            }
            action={() => setRecentDate(true)}
            style={[styles.chart, {width: 120}]}
          />
          <CostomButton
            key={'barchartbtn'}
            InnerComponents={
              <>
                <Text style={styles.addText}>{ATTANDANCE_CHART}</Text>
              </>
            }
            action={() => navigation.navigate(TODAY_ATTANDANCE_CHART)}
            style={styles.chart}
          />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <FilterEmployeee field={''} setEmployeeType={setEmployeeType} />

        <View style={styles.container}>
          <View style={styles.header}>
            {['Employee Id', 'Name', 'Attandance'].map(text => (
              <View key={text}>
                <Text style={styles.headingText}>{text}</Text>
              </View>
            ))}
          </View>
          <ScrollView style={styles.scrollView}>
            {employees.length !== 0 ? (
              employees.map((employee: Employee) => (
                <NewEmployee
                  key={employee.id}
                  navigation={navigation}
                  employee={employee}
                  removeEmployee={''}
                  AttandanceForm
                  attandanceList={attandance}
                  setAttandanceList={setAttandance}
                />
              ))
            ) : (
              <CustomNullMessage employeeType={employeeType} />
            )}
          </ScrollView>
        </View>
        <View style={styles.submitBtn}>
          <CostomButton
            key={'submitBtn'}
            InnerComponents={<Text style={styles.submitText}>{SUBMIT}</Text>}
            action={submitAttandance}
            style={styles.submitButton}
          />
        </View>
      </View>
      {recentDate && (
        <CustomModal
          oldAttendanceFinder={oldAttendanceFinder}
          mode="date"
          formData={false}
          date={date}
          setRecentDate={setRecentDate}
        />
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AttandancePage);

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  backBtn: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 30,
    marginStart: 10,
    flexDirection: 'row',
    gap: 20,
  },
  container: {
    // flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  bodyContainer: {paddingHorizontal: 10},
  header: {
    backgroundColor: '#F8F8FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    // height: 60,
    paddingVertical: 20,
    paddingHorizontal: 10,
    color: '#000',
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    fontSize: 13,
  },
  topSection: {
    backgroundColor: 'blue',
    // height: 100,
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
  scrollView: {height: 500, backgroundColor: 'white'},

  chart: {
    paddingVertical: 8,
    backgroundColor: 'white',
    width: 180,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  addText: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {marginTop: 15, marginEnd: 20, width: 100},
  submitBtn: {alignItems: 'flex-end'},
  submitText: {
    color: 'white',
    backgroundColor: 'blue',
    width: 100,
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
  },
});
