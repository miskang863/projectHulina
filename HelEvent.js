import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListHel from '../components/ListHel';
import { Header } from 'native-base';

const HelEvent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header style={{backgroundColor: '#311B92'}}>
        <Text style={styles.headerText}>Public Events</Text>
      </Header>
      <Text style= {{fontSize: 18, textAlign: "center", 
      fontWeight: "bold", 
      justifyContent: "center", 
      padding: 15, color: '#fff' }}>
        Right Now in Helsinki:</Text>
      <ListHel navigation={navigation} />
      <StatusBar style='dark' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: 'white',
    backgroundColor: '#455a64',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center", 
    
  },
});

HelEvent.propTypes = {
  navigation: PropTypes.object,
};

export default HelEvent;
