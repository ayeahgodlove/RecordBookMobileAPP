import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FinancialListScreen from '../screens/Financial/FinancialListScreen';
import AddFinancialRecordScreen from '../screens/Financial/AddFinancialRecords';
import HomeScreen from '../screens/HomeScreen';
import Header from '../components/Header';
import {TabNavigation} from './TabNavigation';
import AssetListScreen from '../screens/Assets/AssetListScreen';
import AddAssetScreen from '../screens/Assets/AddAssetScreen';
import MinuteListScreen from '../screens/Minutes/MinuteListScreen';
import AddMinuteScreen from '../screens/Minutes/AddMinuteScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: true}}>
    {/* <Stack.Screen
      name="Home"
      component={TabNavigation}
      options={{
        headerBackVisible: false,
        headerShown: false,
        headerTitleAlign: "center"
      }}
    /> */}
    <Stack.Screen
      name="TabNavigation"
      component={TabNavigation}
      options={{
        headerShown: false, // Hides the header for the Tab Navigation
      }}
    />
    <Stack.Screen
      name="FinancialList"
      component={FinancialListScreen}
      options={{title: 'Financial Records'}}
    />
    <Stack.Screen
      name="AddFinancialRecord"
      component={AddFinancialRecordScreen}
      options={{headerShown: true, title: 'Add Financial Record'}}
    />
    <Stack.Screen
      name="AssetList"
      component={AssetListScreen}
      options={{title: 'Asset Records'}}
    />
    <Stack.Screen
      name="AddAsset"
      component={AddAssetScreen}
      options={{title: 'Add Asset'}}
    />
    <Stack.Screen
      name="MinuteList"
      component={MinuteListScreen}
      options={{title: 'Meeting Minutes'}}
    />
    <Stack.Screen
      name="AddMinute"
      component={AddMinuteScreen}
      options={{title: 'Add Minute'}}
    />
  </Stack.Navigator>
);

export default MainNavigator;
