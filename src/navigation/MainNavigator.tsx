import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinancialListScreen from '../screens/Financial/FinancialListScreen';
import AddFinancialRecordScreen from '../screens/Financial/AddFinancialRecords';

const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: true}}>
    <Stack.Screen
        name="FinancialList"
        component={FinancialListScreen}
        options={{title: 'Financial Records'}}
      />
      <Stack.Screen
        name="AddFinancialRecord"
        component={AddFinancialRecordScreen}
        options={{title: 'Add Financial Record'}}
      />
      {/* <Stack.Screen
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
      /> */}
  </Stack.Navigator>
);

export default MainNavigator;
