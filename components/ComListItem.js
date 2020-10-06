import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, {  useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  ListItem as CoolListItem,
  Body,
} from 'native-base';
import { getUser, getUserForComs } from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';

const ListItem = ({ navigation, singleComment }) => {
  const [userObj, setUserObj] = useState({});

  const userData = async () => { //Get the username of commenter
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getUserForComs(userToken, singleComment.user_id);
      setUserObj(user);
    } catch (e) {
      console.log('userData error', e.message);
    }
  };
  useEffect(() => {
    userData();
  }, []);

  const aika = new Date(singleComment.time_added);
  const euroDate =
    aika.getDate() + '.' + aika.getMonth() + '.' + aika.getFullYear();
  const dateFormatted = euroDate + ' ' + aika.toLocaleTimeString();

  return (
    <CoolListItem thumbnail>
      <Body>
        <Text>{dateFormatted}</Text>
        <Text>
          {userObj.username}: {singleComment.comment}
        </Text>
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
  singleComment: PropTypes.object,
};

export default ListItem;
