import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import Home from '../screens/Home';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import Favorites from '../screens/Favorites';
import { colors } from '../../styles/global';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: '#F8F7FB' }}
      shifting={true}
      activeColor={colors.secondary}
      theme={theme}
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: 'home-account',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: 'heart-outline',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: 'shopping-outline',
        }}
      />
      <Tab.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          tabBarIcon: 'dots-vertical',
        }}
      />
    </Tab.Navigator>
  );
};
