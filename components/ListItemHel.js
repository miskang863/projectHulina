import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, Image } from 'react-native';
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
        <Text>
          {moment(singleEvent.datetime).format('MMMM Do YYYY, HH:mm')}
        </Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('SingleHelEvent', {
              file: singleEvent,
            });
          }}
        >
          <Icon name={'eye'}></Icon>
          <Text>View</Text>
        </Button>
      </Right>
    </CoolListItem>
  );
};

ListItem.propTypes = {
  navigation: PropTypes.object,
  singleEvent: PropTypes.object,
};

export default ListItem;
