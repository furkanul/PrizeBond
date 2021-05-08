
import React from 'react';
import PhoneAuthStack from './src/srceen/PhoneAuthStack';
import { NavigationContainer } from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react'
import { store,persistor } from './src/store/persist'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer >
          <PhoneAuthStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
