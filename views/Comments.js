import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import List from '../components/ComList';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Form, Header, Icon } from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useAddCommentForm from '../hooks/CommentHooks';
import AsyncStorage from '@react-native-community/async-storage';
import { postComment } from '../hooks/APIhooks';

const Comments = ({ navigation, route }) => {
  const { file } = route.params;
  const { handleInputChange, inputs, addCommentErrors } = useAddCommentForm();
  const doAddComment = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      await postComment(
        {
          file_id: file.file_id,
          comment: inputs.comment,
        },
        userToken
      );
      navigation.replace('Comments', {file: file})
    } catch (e) {
      console.log('Comment error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.headerText}>Comments</Text>
      </Header>
      <List navigation={navigation} file={file} />
      <StatusBar style='dark' />
      <Form style={{ padding: 15 }}>
        <FormTextInput
          autoCapitalize='none'
          placeholder='Write comment'
          value={inputs.comment}
          onChangeText={(txt) => handleInputChange('comment', txt)}
          error={addCommentErrors.title}
        />
      </Form>
      <Button
        block
        icon
        style={styles.button}
        disabled={addCommentErrors.comment !== null}
        onPress={doAddComment}
      >
        <Icon name='send' />
        <Text style={{ color: '#fff', paddingRight: 15 }}>Submit</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    //  paddingHorizontal: 5,
    flex: 1,
  },
  headerText: {
    color: '#fff',
    paddingTop: 20,
    fontSize: 18,
  },
  button: {},
});

Comments.propTypes = {
  navigation: PropTypes.object,
};

export default Comments;
