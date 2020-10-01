import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import AddEvent from '../views/AddEvent';

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

  </Tab.Navigator>
);
};

const StackScreen = () => {
  // const {isLoggedIn} = useContext(AuthContext);
  return (
    <Stack.Navigator>
          <Stack.Screen name="Home" component={TabScreen} />
    </Stack.Navigator>
  );
};
export default Navigator;
