import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';

const App = createBottomTabNavigator();
const AppStack = createStackNavigator();
const AppRoutes: React.FC = () => (
  <>
    <App.Navigator
      initialRouteName="Equipamentos"
      tabBarOptions={{
        activeTintColor: '#474747',
        keyboardHidesTabBar: true,
        activeBackgroundColor: '#f1f1f1',
        inactiveBackgroundColor: '#fff',
      }}
    >
      <App.Screen name="Equipamentos" component={Dashboard} />
    </App.Navigator>
  </>
);
export default AppRoutes;
