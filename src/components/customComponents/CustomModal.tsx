import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const CustomModal = ({
  date,
  setOpen,
  mode,
  setFormData,
  formData,
  oldAttendanceFinder,
  setRecentDate,
}: any) => {
  const modalType = mode === 'date';

  const handleSubmit = (date: any) => {
    const istDate = moment(date);
    if (formData) {
      modalType
        ? setFormData({...formData, joiningDate: istDate.format('DD/MM/YYYY')})
        : setFormData({...formData, joiningTime: istDate.format('LT')});
      setOpen({time: false, date: false});
    } else {
      oldAttendanceFinder(istDate.format('YYYY/MM/DD'), date);
    }
  };

  const handleCancel = () => {
    if (formData) {
      setOpen({time: false, date: false});
    } else {
      setRecentDate(false);
    }
  };

  return (
    <View style={style.container}>
      <DatePicker
        modal
        theme="light"
        mode={mode}
        open
        date={date}
        onConfirm={date => handleSubmit(date)}
        onCancel={handleCancel}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default CustomModal;
