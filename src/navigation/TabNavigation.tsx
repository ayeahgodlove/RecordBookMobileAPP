import React from 'react';
import FinancialListScreen from '../screens/Financial/FinancialListScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-paper';
import AssetListScreen from '../screens/Assets/AssetListScreen';
import MinuteListScreen from '../screens/Minutes/MinuteListScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Financial') {
            iconName = 'currency-usd';
          } else if (route.name === 'Assets') {
            iconName = 'warehouse';
          } else if (route.name === 'Minutes') {
            iconName = 'notebook-outline';
          }

          return <Icon source={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen name="Financial" component={FinancialListScreen} />
      <Tab.Screen name="Assets" component={AssetListScreen} />
      <Tab.Screen name="Minutes" component={MinuteListScreen} />
    </Tab.Navigator>
  );
};
