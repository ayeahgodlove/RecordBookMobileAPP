import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FinancialListScreen from '../screens/Financial/FinancialListScreen';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Financial Records" component={FinancialListScreen} />
    </Drawer.Navigator>
  );
}
