import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavgator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* Switch between AuthNavigator and MainNavigator */}
    <Stack.Screen name="Auth" component={AuthNavigator} />
    <Stack.Screen name="Main" component={MainNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
