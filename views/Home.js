import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text,  Image, View } from 'react-native';
import List from '../components/List';
import {FlatList} from 'react-native-gesture-handler';
import {Header} from 'native-base';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
          <Header><Text>HELSINGIN HULINAT</Text></Header>

    <List navigation={navigation}/>
    <StatusBar style="auto" />
  </View>
 )};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
