import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { Container, Header, Content, Form, Button, Icon } from 'native-base';
import FormTextInput from '../components/FormTextInput';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import useAddEventForm from '../hooks/AddEventHooks';
import {postEvent, postTag} from '../hooks/APIhooks';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';



const AddEvent = ({navigation}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false); 
    const [dateTime, setDateTime] = useState(null);
    const [image, setImage] = useState(null);
    const [fileType, setFileType] = useState('image');
    const { handleInputChange,  inputs, addEventErrors } = useAddEventForm();

  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      const euroDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
      const dateFormatted = euroDate + ' ' +  date.toLocaleTimeString();
      setDateTime(dateFormatted);
      hideDatePicker();
    };

   const doAddEvent = async () => {

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
      
      // vaihda tähän oikea token, kun logini tehty
      // const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4NDQsInVzZXJuYW1lIjoibWlza3Rlc3QiLCJlbWFpbCI6InRlc3RlckB0ZXN0ZWQuY29tIiwiZnVsbF9uYW1lIjpudWxsLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAyMC0xMC0wMVQwNjo0Mjo0OC4wMDBaIiwiaWF0IjoxNjAxNTM0NTk5LCJleHAiOjE2MDM2MDgxOTl9.9XlU49WcZ6cSzkZxLV2fEQkv_pbo9wBCj0vgMLVI0oo";
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
        navigation.push('Home');
       }, 2000);
    } catch (e) {
      console.log('upload error', e.message);
    } 
    };

    const getPermissionAsync = async () => {
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
    <Header><Text>Add Event</Text></Header>
    <Content style={{padding: 5}}>
        {image &&
    <Image
          source={{ uri: image }}
          style={{ width: null, height: 200, flex: 1 }}
              />

        }

      <Button block onPress={pickImage}>
          <Text>Select image</Text>
        </Button>
       <Button block onPress={showDatePicker}>
         <Text>Select date and time</Text>
       </Button>
      <Form style={{padding: 15}}>
        <FormTextInput
        autoCapitalize='none'
        placeholder='Event name'
        value={inputs.title}
        onChangeText={(txt) => handleInputChange('title', txt)}
        error={addEventErrors.title}
        />
        <FormTextInput
        autoCapitalize="none"
        placeholder='Description'
        value={inputs.description}
        onChangeText={(txt) => handleInputChange('description', txt)}
        error={addEventErrors.description}
        />
                <FormTextInput
        autoCapitalize='none'
        placeholder='City'
        value={inputs.city}
        onChangeText={(txt) => handleInputChange('city', txt)}
        error={addEventErrors.city}
        />

        <FormTextInput
        autoCapitalize='none'
        placeholder='Address'
        value={inputs.address}
        onChangeText={(txt) => handleInputChange('address', txt)}
        error={addEventErrors.address}
        />
      </Form>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        locale="en_GB"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button
       large icon style={styles.button} 
       disabled={
        addEventErrors.title !== null ||
        addEventErrors.description !== null ||
        addEventErrors.address !== null ||
        addEventErrors.city !== null ||
        image === null ||
        dateTime === null 
       }
       onPress={doAddEvent}>
            <Icon name='send'/>
            <Text style={{color: '#fff', paddingRight: 15,}}>Submit</Text>
       </Button>

    </Content>
  </Container>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40,
  },
  button: {
     alignSelf: 'center',
  },
});

AddEvent.propTypes = {
  navigation: PropTypes.object,
};

export default AddEvent;
