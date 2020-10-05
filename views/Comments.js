import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text,  Image, View } from 'react-native';
import List from '../components/ComList';
import {FlatList} from 'react-native-gesture-handler';
import {Header} from 'native-base';


const Comments = ({navigation}) => {
  return (
    <View style={styles.container}>
<Header>
  <Text style={styles.headerText}>Comments</Text>
</Header>
    <List navigation={navigation}/>
    <StatusBar style="dark"/>
  </View>
 )};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    //  paddingHorizontal: 5,
  },
  headerText: {
    color: '#fff',
    paddingTop: 20,
    fontSize: 18,
  }
});

Comments.propTypes = {
  navigation: PropTypes.object,
};

export default Comments;
