import React, {useState} from 'react';
import {
  FlatList,
} from 'react-native';
import ListItem from './ComListItem';
import PropTypes from 'prop-types';
import {useLoadComments, useLoadEvent} from '../hooks/APIhooks';

const List =  ({navigation, file}) => {
    const [commentArray2, setCommentArray2] = useState([]);

        // const eventArray = useLoadEvent();
      // console.log('event array', eventArray);
    //   const comArray =  useLoadComments(2827);
    //   console.log('comarray', comArray);
    //   console.log('event rray', eventArray);
    let jimbala = [];


      const getComs = async () => {
jimbala = await useLoadComments(file.file_id);
setCommentArray2(jimbala);
        // console.log('comArray', comArray);
        // jimbala = await useLoadComments(2827);
    };
    getComs();
    //   const comArray2 =  getComs();
    console.log('jimbala', commentArray2);

        // const comArrayTwo = getComments(2827);
        // console.log('comarray2', comArray2);

  return (
<FlatList
      data={commentArray2}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <ListItem navigation={navigation} singleComment={item} />
      }>
      </FlatList>
 )};


export default List;
