import React from 'react';

// redux
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';
import Router from './src/Router';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
