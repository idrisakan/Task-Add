import React from 'react';
import Routes from './navigation/Routes';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
/* import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(); */

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
      <Toast />
    </NavigationContainer>
  );
}
