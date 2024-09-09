import { legacy_createStore as createStore } from 'redux'
import { rootReducer } from './reduceCombiner.ts'
import { persistStore } from 'redux-persist'

export const RootStack = typeof (rootReducer)

const store = createStore(rootReducer)

export default store
export const persistor = persistStore(store)
