import React from 'react';
import {
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {getComments, useLoadEvent} from '../hooks/APIhooks';

const List = ({navigation}) => {
      const eventArray = useLoadEvent();
      // console.log('event array', eventArray);
  return (
<FlatList
      data={eventArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <ListItem navigation={navigation} singleEvent={item} />
      }>
      </FlatList>
 )};


export default List;
