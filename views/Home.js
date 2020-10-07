
import PropTypes from 'prop-types';
import React, { Component, useContext, useEffect } from 'react';
import { StyleSheet, Text, Image, View, StatusBar } from 'react-native';
import List from '../components/List';
import { FlatList } from 'react-native-gesture-handler';
import { Header } from 'native-base';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIhooks';

const Home = ({ navigation }) => {

  const {setIsLoggedIn, setUser, user} = useContext(AuthContext);

  const getToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        try {
          const userData = await checkToken(userToken);
          console.log('token valid', userData);
          setIsLoggedIn(true);
          setUser(userData);
        } catch (e) {
          console.log('token check failed', e.message);
        }
      }
    };
    useEffect(() => {
      getToken();
      console.log('USER', user);
    }, []);

  return (
    <View style={styles.container}>

      <Text>Hot Right Now:</Text>
      <List navigation={navigation} />
      <StatusBar style='dark' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'grey',
    paddingBottom: 60,
    //  paddingHorizontal: 5,
  },
  headerText: {
    color: '#fff',
    paddingTop: 20,
    fontSize: 18,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
