import React from 'react';
import {View, StyleSheet, processColor} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';
import CostomHeaderText from '../../components/customComponents/CustomHeaderText';
import {HOME} from '../../utils/constants';
import {animation, legend} from '../../utils/chartElements';
import {attandanceCalcy} from '../../utils/rawData';

const IndividualPieChart = ({route, navigation}: any) => {
  const {AttandanceData, employee} = route.params;
  const {workingDays, attandance} = attandanceCalcy(
    AttandanceData,
    employee.id,
  );

  const data = {
    dataSets: [
      {
        values: [
          {
            value: 30 - workingDays,
            label: 'Days having no data',
          },
          {value: attandance, label: 'Present'},
          {value: workingDays - attandance, label: 'Absent'},
        ],
        label: '',
        config: {
          colors: [
            processColor('lightgray'),
            processColor('#4CAF50'),
            processColor('#F44336'),
          ],
          valueTextSize: 16,
          valueTextColor: processColor('black'),
          sliceSpace: 5,
          selectionShift: 13,
        },
      },
    ],
  };

  return (
    <>
      <View style={styles.header}>
        <CostomHeaderText
          navigation={navigation}
          screen={HOME}
          headerText={`Attesndance of ${employee.name} (id: ${employee.id})`}
        />
      </View>
      <View style={styles.container}>
        <PieChart
          style={styles.chart}
          logEnabled={true}
          data={data}
          legend={legend}
          entryLabelColor={processColor('black')}
          entryLabelTextSize={14}
          rotationEnabled={true}
          rotationAngle={45}
          usePercentValues={false}
          styledCenterText={{
            text: 'Attendance Stats',
            color: processColor('gray'),
            size: 20,
          }}
          centerTextRadiusPercent={100}
          drawEntryLabels={false}
          holeRadius={40}
          transparentCircleRadius={45}
          chartDescription={{text: ''}}
          animation={animation}
        />
      </View>
    </>
  );
};

export default IndividualPieChart;

const styles = StyleSheet.create({
  header: {
    height: 150,
    paddingTop: 50,
    backgroundColor: 'blue',
    paddingStart: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    // marginStart: 20,
  },
  chart: {
    width: 500,
    height: 500,
    marginStart: 20,
  },
});
