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
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Tab.Navigator>
      {isLoggedIn ? (
        <>
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='HelEvent' component={HelEvent} />
          <Tab.Screen name='Add Event' component={AddEvent} />
          <Tab.Screen name='Profile' component={Profile} />
        </>
      ) : (
        <>
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='HelEvent' component={HelEvent} />
          <Tab.Screen name='Login' component={Login} />
        </>
      )}
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name='Home' component={TabScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#445963',
            },
            headerTintColor: '#fff',
            title: 'Helsingin Hulinat',    
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
          <Stack.Screen name='Home' component={TabScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#445963',
            },
            headerTintColor: '#fff',
            title: 'Helsingin Hulinat',    
          }}/>
          <Stack.Screen name='HelEvent' component={TabScreen} />
          <Stack.Screen name='Event' component={Event} 
                  options={{
                    headerStyle: {
                      backgroundColor: '#445963',
                    },
                    headerTintColor: '#fff',
            
                  }}/>
          <Stack.Screen name='Login' component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default Navigator;
