import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SavvyStepperMain from './SavvyStepperMain';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SavvyStepperMain></SavvyStepperMain>
  );
};

export default App;