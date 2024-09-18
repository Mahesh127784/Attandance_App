import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CostomButton from './customComponents/CustomButton';
import CostomText from './customComponents/CustomText';
import CustomModal from './customComponents/CustomModal';

const DateTimeInput = ({inputHeading, formData, setFormData}: any) => {
  //date modal visibility
  const [open, setOpen] = useState({
    date: false,
    time: false,
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (formData.joiningDate && formData.joiningTime) {
      const [day, month, year] = formData.joiningDate
        .split('/')
        .map((val: string) => Number(val));

      let [hour, min] = formData.joiningTime.split(':').map((val: string) => {
        const num = Number(val.split(' ')[0]);
        return Number.isNaN(num) ? 0 : num;
      });

      const isPM = formData.joiningTime.includes('PM');
      if (isPM && hour < 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;
      console.log('rub');

      setDate(new Date(year, month - 1, day, hour, min));
    }
  }, [formData.joiningDate, formData.joiningTime]);
  return (
    <View>
      <Text style={inputHeading}>Joined On *</Text>
      <View style={{flexDirection: 'row', gap: 20}}>
        <CostomButton
          key={'calanderbtn'}
          InnerComponents={
            <CostomText
              style={{}}
              placeholder="Date"
              defaultValue={formData.joiningDate}
            />
          }
          action={() => setOpen({time: false, date: true})}
          style={{}}
        />
        <CostomButton
          key={'timebtn'}
          InnerComponents={
            <CostomText
              style={{width: 100}}
              placeholder="Time"
              defaultValue={formData.joiningTime}
            />
          }
          action={() => setOpen({time: true, date: false})}
          style={{}}
        />
      </View>
      {['date', 'time'].map(
        val =>
          open[val] && (
            <CustomModal
              key={val}
              setOpen={setOpen}
              setFormData={setFormData}
              mode={val}
              formData={formData}
              date={date}
            />
          ),
      )}
    </View>
  );
};

export default DateTimeInput;

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
