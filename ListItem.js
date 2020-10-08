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
import moment from 'moment';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({ navigation, singleEvent }) => {
  const allData = JSON.parse(singleEvent.description);
  const dateTime = allData.dateTime;
  const city = allData.city;

  return (
    <CoolListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{ uri: apiUrl + singleEvent.thumbnails.w160 }}
        />
      </Left>
      <Body>
        <Text style={{color: '#fff'}}>{singleEvent.title}</Text>
        <Text style={{color: '#fff'}}>{city}</Text>
        <Text style={{color: '#fff'}}>{moment(dateTime).format('MMMM Do YYYY, HH:mm')}</Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('Event', {
              file: singleEvent,
            });
          }}
        >
          <Icon style={styles.icon} name={'eye'}></Icon>
          <Text style={{color: "white"}}>View</Text>
          </Button>
      </Right>
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
  icon: {
    color: "white",
  }
});

ListItem.propTypes = {
  navigation: PropTypes.object,
  singleEvent: PropTypes.object,
};

export default ListItem;
