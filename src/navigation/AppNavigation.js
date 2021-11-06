import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationRef, isReadyRef} from './NavigationService';

import Language from '../screens/Language';
import UserInfo from '../screens/UserInfo';
import Step1 from '../screens/Step1';
import Step2 from '../screens/Step2';
import Step3 from '../screens/Step3';
import Step4 from '../screens/Step4';
import Step5 from '../screens/Step5';
import Step6 from '../screens/Step6';
import Step7 from '../screens/Step7';
import Step8 from '../screens/Step8';
import Final from '../screens/Final';
import Main from '../screens/Main';
const Stack = createStackNavigator();
const InitialNavigator = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Language"
          component={Language}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step1"
          component={Step1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step2"
          component={Step2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step3"
          component={Step3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step4"
          component={Step4}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step5"
          component={Step5}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step6"
          component={Step6}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step7"
          component={Step7}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Step8"
          component={Step8}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Final"
          component={Final}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InitialNavigator;
