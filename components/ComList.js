import React, { useState } from 'react';
import { FlatList } from 'react-native';
import ListItem from './ComListItem';
import PropTypes from 'prop-types';
import { useLoadComments, useLoadEvent } from '../hooks/APIhooks';

const List = ({ navigation, file }) => {
  const [commentArray, setCommentArray] = useState([]);

  let coms = [];

  const getComs = async () => {
    coms = await useLoadComments(file.file_id);
    setCommentArray(coms);
  };
  getComs();

  return (
    <FlatList
      data={commentArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItem navigation={navigation} singleComment={item} />
      )}
    ></FlatList>
  );
};

export default List;
