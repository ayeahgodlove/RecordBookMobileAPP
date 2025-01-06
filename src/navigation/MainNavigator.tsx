import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddFinancialRecordScreen from '../screens/Financial/AddFinancialRecords';
import {TabNavigation} from './TabNavigation';
import AddAssetScreen from '../screens/Assets/AddAssetScreen';
import AddMinuteScreen from '../screens/Minutes/AddMinuteScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: true}}>
    <Stack.Screen
      name="TabNavigation"
      component={TabNavigation}
      options={{
        headerShown: false, // Hides the header for the Tab Navigation
      }}
    />
    <Stack.Screen
      name="AddFinancialRecord"
      component={AddFinancialRecordScreen}
      options={{headerShown: true, title: 'Add Financial Record'}}
    />
    <Stack.Screen
      name="AddAsset"
      component={AddAssetScreen}
      options={{title: 'Add Asset'}}
    />
    <Stack.Screen
      name="AddMinute"
      component={AddMinuteScreen}
      options={{title: 'Add Minute'}}
    />
  </Stack.Navigator>
);

export default MainNavigator;
