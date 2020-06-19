import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import Category from '../pages/Category';
import CategoryAdd from '../pages/Category/Add';
import ProductAdd from '../pages/Product/Add';
import CategoryShow from '../pages/Category/Show';
import ProductEdit from '../pages/Product/Edit';
const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <>
    <App.Navigator headerMode="none" mode="card">
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="Product" component={Product} />
      <App.Screen name="ProductAdd" component={ProductAdd} />
      <App.Screen name="Category" component={Category} />
      <App.Screen name="CategoryAdd" component={CategoryAdd} />
      <App.Screen name="CategoryShow" component={CategoryShow} />
      <App.Screen name="ProductEdit" component={ProductEdit} />
    </App.Navigator>
  </>
);
export default AppRoutes;
