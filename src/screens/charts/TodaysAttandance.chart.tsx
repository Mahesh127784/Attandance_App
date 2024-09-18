import React from 'react';
import {View, StyleSheet, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {connect} from 'react-redux';
import {mapStateToProps} from '../../utils/connectMethods';
import CostomHeaderText from '../../components/customComponents/CustomHeaderText';
import {animation, legend} from '../../utils/chartElements';
import {
  ATTANDANCE_CHART,
  ATTANDANCE_PAGE_NAVIGATE,
} from '../../utils/constants';
import {AttandanceModel} from '../../utils/types';
import {getToday} from 'react-native-modern-datepicker';

const AttandanceChart = ({empData, AttandanceData, navigation}: any) => {
  const todayAttendance = () => {
    const todaysData = AttandanceData[getToday()];
    let todayPresent = 0;
    if (todaysData) {
      todaysData.forEach((data: AttandanceModel) => {
        if (data.attandance == true) todayPresent++;
      });
    }
    return {todayPresent, todayAbsant: empData.length - todayPresent};
  };

  const {todayPresent, todayAbsant} = todayAttendance();

  const data = {
    dataSets: [
      {
        label: `Total Employees - ${empData.length}`,
        values: [{y: todayPresent}, {y: todayAbsant}],
        config: {
          color: processColor('blue'),
          barShadowColor: processColor('green'),
          highlightAlpha: 90,
          highlightColor: processColor('purple'),
        },
      },
    ],
  };

  const xAxis = {
    valueFormatter: ['Present Today', 'Absent Today'],
    granularityEnabled: true,
    granularity: 1,
    position: 'BOTTOM',
    drawGridLines: false,
    textSize: 20,
    textColor: processColor('#000'),
  };
  const yAxis = {
    left: {
      axisMinimum: 0,
      axisMaximum: empData.length,
      granularityEnabled: true,
      granularity: 1,
      drawGridLines: false,
    },
    right: {
      enabled: false,
    },
  };

  return (
    <>
      <View style={styles.header}>
        <CostomHeaderText
          navigation={navigation}
          screen={ATTANDANCE_PAGE_NAVIGATE}
          headerText={ATTANDANCE_CHART}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={data}
            xAxis={xAxis}
            yAxis={yAxis}
            chartDescription={{text: ''}}
            legend={{...legend, position: 'BELOW_CHART_RIGHT'}}
            animation={animation}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
          />
        </View>
      </View>
    </>
  );
};

export default connect(mapStateToProps)(AttandanceChart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
  header: {
    height: 120,
    paddingTop: 40,
    backgroundColor: 'blue',
    paddingStart: 15,
  },
});
