import React, { Children, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { Container, Header, Content, Form, Button, Icon, Spinner } from 'native-base';
import FormTextInput from '../components/FormTextInput';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import useAddEventForm from '../hooks/AddEventHooks';
import { postEvent, postTag } from '../hooks/APIhooks';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { Video } from 'expo-av';
import { contains } from 'validate.js';

const AddEvent = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const [image, setImage] = useState(null);
  const [fileType, setFileType] = useState('image');
  const { handleInputChange, inputs, addEventErrors } = useAddEventForm();
  const [isLoading, setIsLoading] = useState(false);

  //DateTime Handler
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateTime(date);
    hideDatePicker();
  };

  const doAddEvent = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const formData = new FormData();
      const moreData = {
        description: inputs.description,
        address: inputs.address,
        city: inputs.city,
        dateTime: dateTime,
      };

      formData.append('title', inputs.title);
      formData.append('description', JSON.stringify(moreData));

      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = match ? `${fileType}/${match[1]}` : fileType;
      if (type === 'image/jpg') {
        type = 'image/jpeg';
      }
      formData.append('file', { uri: image, name: filename, type });

      const resp = await postEvent(formData, userToken);
      console.log('upload', resp);

      const postTagResponse = await postTag(
        {
          file_id: resp.file_id,
          tag: 'helsinginhulinat9999',
        },
        userToken
      );
      console.log('Posting  tag:', postTagResponse);

      setTimeout(() => {
        navigation.replace('Home');
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      console.log('upload error', e.message);
      setIsLoading(false);
    }
  };

  const getPermissionAsync = async () => {
    //Get permissions
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
  });

  const pickImage = async () => {
    //Image picker
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setFileType(result.type);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };


  return (
    <Container style={styles.container}>
      <Header style={{color: '#311B92'}}>
      <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 20, textAlign: "center", paddingBottom: 5 }}>Add your event</Text>
      </Header>
      <Content style={{ padding: 10}}>

        <Form style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='Event name'
            placeholderTextColor="#fff"
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={addEventErrors.title}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='Description'
            placeholderTextColor="#fff"
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={addEventErrors.description}
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='City'
            placeholderTextColor="#fff"
            value={inputs.city}
            onChangeText={(txt) => handleInputChange('city', txt)}
            error={addEventErrors.city}
          />

          <FormTextInput style={styles.formInput}
            autoCapitalize='none'
            placeholder='Address'
            placeholderTextColor="#fff"
            value={inputs.address}
            onChangeText={(txt) => handleInputChange('address', txt)}
            error={addEventErrors.address}
          />
        </Form>

        {image && (
          <>
            {fileType == 'image' ? (
              <Image
                source={{ uri: image }}
                style={{ width: null, height: 200, flex: 1 }}
              />
            ) : (
                <Video
                  source={{ uri: image }}
                  style={{ height: 400, width: null, flex: 1 }}
                  useNativeControls={true}
                />
              )}
          </>
        )}

        <Button block style={{ flex: 1, marginBottom: 20, borderRadius: 15 }} onPress={pickImage}>
          <Icon name={'camera'}></Icon>
          <Text style={{ color: '#fff', paddingRight: 30 }}>SELECT IMAGE</Text>
        </Button>

        <Button block style={{borderRadius: 15}} onPress={showDatePicker}>
          <Icon name={'calendar'}></Icon>
          <Text style={{ color: '#fff', paddingRight: 30 }}>SELECT DATA AND TIME</Text>
        </Button>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='datetime'
          locale='en_GB'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {isLoading && <Spinner color='blue' />}
        <Button
          large
          icon
          style={styles.button}
          disabled={image === null}
          onPress={doAddEvent}
        >
           <Icon name='send' />
          <Text style={{ color: '#fff', paddingRight: 30 }}>SUBMIT</Text>
        </Button>
      </Content>
    </Container>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#311B92',
    justifyContent: "center",
           
  },

  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  text: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 15,
    color: '#fff',
    paddingTop: 5,

  },

  button: {
    alignSelf: 'center',
    margin: 30,
    backgroundColor: '#7C4DFF',
    borderRadius: 15,
    
    
  },

  formInput: {
    flex: 1,
    color: '#fff',
    paddingTop: 15,
    paddingBottom: 15,

  },


});

AddEvent.propTypes = {
  navigation: PropTypes.object,
};

export default AddEvent;