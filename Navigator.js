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
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import SingleHelEvent from '../views/SingleHelEvent';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
          <Tab.Screen
            name='Private Events'
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='home' size={30} color={'#311B92'}></Icon>,
            }}
          />
          <Tab.Screen
            name='Public Events'
            component={HelEvent}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='storage'size={30} color={'#311B92'} ></Icon>,
            }}
          />
          <Tab.Screen
            name='Add Event'
            component={AddEvent}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='add' size={30} color={'#311B92'}></Icon>,
            }}
          />
          <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='person' size={30} color={'#311B92'} ></Icon>,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='home'></Icon>,
            }}
          />
          <Tab.Screen
            name='Puplic Event'
            component={HelEvent}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='storage'></Icon>,
            }}
          />
          <Tab.Screen
            name='Login'
            component={Login}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='lock' ></Icon>,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name='Home'
            component={TabScreen}
            options={{
            headerStyle: {
                backgroundColor: '#7C4DFF',
              },
              headerTintColor: '#fff',
              headerTitle: 'Hulinat App',
              headerRight: () => (
                <TouchableOpacity onPress={logout}>
                  <MaterialCommunityIcons
                    name='logout'
                    size={25}
                    color='white'
                                        
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name='HelEvent' component={TabScreen} />
          <Stack.Screen
            name='Event'
            component={Event}
            options={{
              headerStyle: {
                backgroundColor: '#445963',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name='SingleHelEvent'
            component={SingleHelEvent}
            options={{
              headerStyle: {
                backgroundColor: '#445963',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name='Profile'
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name='face'></Icon>,
            }}
          />

          <Stack.Screen
            name='Comments'
            component={Comments}
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
          <Stack.Screen
            name='Home'
            component={TabScreen}
            options={{
              headerStyle: {
                backgroundColor: '#445963',
              },
              headerTintColor: '#fff',
              title: 'Helsingin Hulinat',
            }}
          />
          <Stack.Screen name='HelEvent' component={TabScreen} />
          <Stack.Screen
            name='Event'
            component={Event}
            options={{
              headerStyle: {
                backgroundColor: '#445963',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name='SingleHelEvent'
            component={SingleHelEvent}
            options={{
              headerStyle: {
                backgroundColor: '#445963',
              },
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen name='Login' component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};


export default Navigator;
