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
import { StyleSheet} from 'native-base';
import { color } from 'react-native-reanimated';
import {Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

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
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Tab.Navigator>
      {isLoggedIn ? (
        <>
          <Tab.Screen  name='Home' component={Home}  options={{ tabBarIcon:({color, size}) => (<Icon name="home"></Icon>)}}/>
          <Tab.Screen name='Add Event' component={AddEvent} options={{ tabBarIcon:({color, size}) => (<Icon name="add"></Icon>)}}/>
          <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon:({color, size}) => (<Icon name="face"></Icon>)}}/>
          <Tab.Screen name='Public Event' component={HelEvent} options={{ tabBarIcon:({color, size}) => (<Icon name="event"></Icon>)}} />
        </>
      ) : (
        <>
          <Tab.Screen  name='Home' component={Home}  options={{ tabBarIcon:({color, size}) => (<Icon name="home"></Icon>)}}/>
          <Tab.Screen name='Puplic Event' component={HelEvent}  options={{ tabBarIcon:({color, size}) => (<Icon name="event"></Icon>)}} />
          <Tab.Screen name='Login' component={Login} options={{ tabBarIcon:({color, size}) => (<Icon name="lock"></Icon>)}}/>
        </>
      )}
    </Tab.Navigator>
  );
};

const StackScreen = () => {
 // const { isLoggedIn } = useContext(AuthContext);
  const {setIsLoggedIn, isLoggedIn} = useContext(AuthContext);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name='Home' component={TabScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#7C4DFF',
            },
            headerTintColor: '#fff',
            headerTitle: 'Hulinat App', 
            headerRight: () => <TouchableOpacity onPress={logout}><Icon name="face"></Icon></TouchableOpacity>
          }}/>
          <Stack.Screen name='HelEvent' component={TabScreen} />
          <Stack.Screen name='Event' component={Event} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#445963',
                    },
                    headerTintColor: '#fff',
                    
            
                  }}/>
          <Stack.Screen name='Comments' component={Comments}
          options={{
                    headerStyle: {
                      backgroundColor: '#140078',
                    },
                    headerTintColor: '#fff',
            
                  }}
           />
        </>
      ) : (
        <>
          <Stack.Screen name='Home' component={TabScreen}  options={{
            headerStyle: {
              backgroundColor: '#445963',
            },
            headerTintColor: '#fff',
            title: 'Helsingin Hulinat',    
          }}/>
          <Stack.Screen name='HelEvent' component={TabScreen} />
          <Stack.Screen name='Event' component={Event} />
          <Stack.Screen name='Login' component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default Navigator;
