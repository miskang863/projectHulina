import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text,  Image } from 'react-native';
import {ListItem as CoolListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';

const testImg = 'https://www.thesprucepets.com/thmb/xdBOcy1ctLYF7j3y1vaDtVijWxM=/2997x2248/smart/filters:no_upscale()/kitten-looking-at-camera-521981437-57d840213df78c583374be3b.jpg';
const apiUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({navigation, singleEvent}) => {
  return (

        <CoolListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: apiUrl +  singleEvent.thumbnails.w160}} />
          </Left>
          <Body>
            <Text>Event Name</Text>
            <Text note numberOfLines={1}>Event time?</Text>
          </Body>
          <Right>
            <Button transparent>
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
