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
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center", 
    width: 400,
    paddingTop: 15,
  },
});

HelEvent.propTypes = {
  navigation: PropTypes.object,
};

export default HelEvent;