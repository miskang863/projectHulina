import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListHel from '../components/ListHel';
import { Header } from 'native-base';

const HelEvent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.headerText}>Public Events</Text>
      </Header>
      <Text>Right Now in Helsinki:</Text>
      <ListHel navigation={navigation} />
      <StatusBar style='dark' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'white',
  },
  headerText: {
    color: '#fff',
    paddingTop: 20,
    fontSize: 18,
  },
});

HelEvent.propTypes = {
  navigation: PropTypes.object,
};

export default HelEvent;
