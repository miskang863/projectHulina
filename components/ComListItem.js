import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text,  Image } from 'react-native';
import {ListItem as CoolListItem, Thumbnail, Left, Body, Right, Button, Icon } from 'native-base';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({navigation, singleComment}) => {
  // const allData = JSON.parse(singleEvent.description);
  // const description = allData.description;
  // const dateTime = allData.dateTime;
  // const address = allData.address;
  // const city = allData.city;


  return (

        <CoolListItem thumbnail>
          <Body>
            <Text>{singleComment.comment}</Text>

          </Body>
        </CoolListItem>
 )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ListItem.propTypes = {
  navigation: PropTypes.object,
  singleComment: PropTypes.object,
};

export default ListItem;
