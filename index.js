/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import App from './src/navigation/AppNavigation';
import {name as appName} from './app.json';
import store from './src/redux/store';
import FullScreen from './src/FullScreen';
FullScreen.enable();

const OrigiHub = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => OrigiHub);
