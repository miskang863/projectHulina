import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import {
  ListItem as CoolListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Icon,
} from 'native-base';

const ListItem = ({ navigation, singleEvent }) => {
  return (
    <CoolListItem thumbnail>
      <Left>
        {singleEvent.images != null && (
          <>
            <Thumbnail square source={{ uri: singleEvent.images }} />
          </>
        )}
      </Left>
      <Body>
        <Text>{singleEvent.name}</Text>
        <Text>{singleEvent.city}</Text>
        <Text>{singleEvent.datetime}</Text>
      </Body>
    </CoolListItem>
  );
};

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
