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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
