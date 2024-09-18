import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './utils/types';

//  screens
import NewEmployee from './screens/NewEmployee.Form';
import Home from './screens/Home';
import TodaysAttandanceChart from './screens/charts/TodaysAttandance.chart';
import IndividualAttandanceChart from './screens/charts/IndividualAttandance.chart';
import AttandancePage from './screens/AttandancePage';

const Router = (): JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewEmployeeForm" component={NewEmployee} />
        <Stack.Screen name="AttandancePage" component={AttandancePage} />
        <Stack.Screen
          name="TodayAttandanceChart"
          component={TodaysAttandanceChart}
        />
        <Stack.Screen
          name="IndividualAttandance"
          component={IndividualAttandanceChart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
