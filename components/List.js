import React from 'react';
import {
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import {useLoadEvent} from '../hooks/APIhooks';

const List = ({navigation}) => {
      const eventArray = useLoadEvent();



  return (
<FlatList
      data={eventArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <ListItem navigation={navigation} singleEvent={item} />
      }>
      </FlatList>
 )};


List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
