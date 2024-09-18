import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {rootReducer} from './reduceCombiner.ts';
import {persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';
import {thunk} from 'redux-thunk';

const logger = createLogger();
const middlewares = [thunk];
const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

if (__DEV__) {
  middlewares.push(logger);
}

export default store;
export const persistor = persistStore(store);
