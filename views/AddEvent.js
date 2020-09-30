import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Container, Header, Content, Form, Button, Icon } from 'native-base';
import FormTextInput from '../components/FormTextInput';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import useAddEventHooks from '../hooks/AddEventHooks';
import {postEvent} from '../hooks/APIhooks';
// import AsyncStorage from '@react-native-community/async-storage';



const AddEvent = ({navigation}) => {
    const [image, setImage] = useState(null);
    const [fileType, setFileType] = useState('image');
    const { handleInputChange,  inputs } = useAddEventHooks();


   const doAddEvent = async () => {

    try {
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);

      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = match ? `${fileType}/${match[1]}` : fileType;
      if (type === 'image/jpg') {
        type = 'image/jpeg';
      }
      formData.append('file', { uri: image, name: filename, type });
      // kovakoodattu token itoistaiseksi
      const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2NDIsInVzZXJuYW1lIjoibWlza2FuZyIsImVtYWlsIjoibWlza2FuZ0BtZXRyb3BvbGlhLmZpIiwiZnVsbF9uYW1lIjpudWxsLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAyMC0wOC0yOFQwOToxMzoyMi4wMDBaIiwiaWF0IjoxNTk4NjA4NzI4LCJleHAiOjE2MDA2ODIzMjh9.k1OeMvU4OmDUyUINkXXoRI6O0wI56bwhvH2NJ_nM4wY";
      const resp = await postEvent(formData, userToken);
      console.log('upload', resp);
      
      // wait 2s
      // setTimeout(() => {
      //   navigation.push('Home');
      // }, 2000);
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

      <Form style={{padding: 15}}>
        <FormTextInput
        autoCapitalize="none"
        placeholder='Event name'
        value={inputs.title}
        onChangeText={(txt) => handleInputChange('title', txt)}
/>
        <FormTextInput
        autoCapitalize="none"
        placeholder='Description'
        value={inputs.description}
        onChangeText={(txt) => handleInputChange('description', txt)}
/>
      </Form>
      <Button block onPress={pickImage}>
          <Text>Select image</Text>
        </Button>
      <Button large icon style={styles.button} onPress={doAddEvent}>
            <Icon name='send'/>
            <Text style={{color: '#fff', paddingRight: 15,}}>Add Event!</Text>
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

export default AddEvent;
