import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import AddEvent from '../views/AddEvent';
import Event from '../views/Event';
import Login from '../views/Login';
import Comments from '../views/Comments';
import HelEvent from '../views/HelEvent';
import { AuthContext } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Add Event' component={AddEvent} />
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='Login' component={Login} />
      <Tab.Screen name='HelEvent' component={HelEvent} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
    const {isLoggedIn} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={TabScreen} />
      <Stack.Screen name="HelEvent" component={TabScreen} />
      <Stack.Screen name='Event' component={Event} />

      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Comments' component={Comments} />
    </Stack.Navigator>
  );
};
export default Navigator;
