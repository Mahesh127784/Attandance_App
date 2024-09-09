import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from './types'

//  screens
import NewEmployee from './screens/NewEmployee.Form'
import Home from './screens/Home'

// redux
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from 'react-native'
import AttandancePage from './screens/AttandancePage'

const App = (): JSX.Element => {
    const Stack = createNativeStackNavigator<RootStackParamList>()

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
                <NavigationContainer  >
                    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
                        <Stack.Screen
                            name='Home'
                            component={Home} />
                        <Stack.Screen
                            name='NewEmployeeForm'
                            component={NewEmployee} />
                        <Stack.Screen
                            name='AttandancePage'
                            component={AttandancePage} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App