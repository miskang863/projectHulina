import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import List from '../components/ComList';
import { Button, Form, Icon } from 'native-base';
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
      navigation.replace('Comments', { file: file });
    } catch (e) {
      console.log('Comment error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <List navigation={navigation} file={file} />
      <StatusBar backgroundColor='#140078' barStyle='light-content' />
      <Form style={{}}>
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
        <Text style={{ color: '#ffffff', paddingRight: 15 }}>Submit</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#512ca8',
    flex: 1,
  },
  button: {
    padding: 10,
  },
});

Comments.propTypes = {
  navigation: PropTypes.object,
};

export default Comments;
