import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import AddEvent from '../views/AddEvent';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Profile' component={Profile} />
        <Tab.Screen name='Add Event' component={AddEvent} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
