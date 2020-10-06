import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text,  Image } from 'react-native';
import {ListItem as CoolListItem, Thumbnail, Left, Body, Right, Button, Icon } from 'native-base';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({navigation, singleEvent}) => {
  const allData = JSON.parse(singleEvent.description);
  const description = allData.description;
  const dateTime = allData.dateTime;
  const address = allData.address;
  const city = allData.city;


  return (

        <CoolListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: apiUrl +  singleEvent.thumbnails.w160}} />
          </Left>
          <Body>
            <Text>{singleEvent.title}</Text>
            <Text>{city}</Text>
            <Text>{dateTime}</Text>

          </Body>
          <Right>
            <Button transparent  onPress={() => {
            navigation.navigate('Event', {
              file: singleEvent,
            });
          }}>
            <Icon name={'eye'}></Icon>
              <Text>View</Text>
            </Button>
          </Right>
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
  singleEvent: PropTypes.object,
};

export default ListItem;
