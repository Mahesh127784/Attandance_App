import { combineReducers } from "redux"
import EmployeeReducer from "./reducers/employeeeReducers"
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export const rootReducer = combineReducers({
    Employee: persistReducer(persistConfig, EmployeeReducer),
})
