import React, { useContext, useState, useEffect } from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Body,
  Button,
   View,
   Spinner,
} from 'native-base';
import { getAvatar, postTag, postEvent } from '../hooks/APIhooks';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({ navigation }) => {
  const { setIsLoggedIn, user, isLoggedIn } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([{ filename: '' }]);
  const [image, setImage] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [isLoading, setIsLoading] = useState(false);
  const [gotAvatar, setGotAvatar] = useState(false);


  //AVATAR IS VERY BUGGY :(
  const fetchAvatar = async () => {
    console.log('fetching avatar');
    setAvatar(await getAvatar(user.user_id));
    console.log('avatar', avatar);
    if(avatar[0].filename != ""){
      console.log('got avatar', gotAvatar);
      setGotAvatar(true)
    };
  };
  
  useEffect(() => {
    fetchAvatar();
  }, []);
  
  const doAddAvatar = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const formData = new FormData();

      formData.append('title', 'avatar');

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
          tag: 'avatar_' + user.user_id,
        },
        userToken
      );
      console.log('Posting  tag:', postTagResponse);

      setTimeout(() => {
        navigation.replace('Profile');
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


  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <Container>
      <StatusBar backgroundColor='#7C4DFF' barStyle='light-content' />

      <Content padder style={styles.container}>
        {user && (
          <Card transparent style={styles.card}>
            <CardItem
              style={{
                borderRadius: 15,
                padding: 10,
                backgroundColor: '#311B92',
              }}
              header
            >
              <Icon style={{ color: '#fff' }} name='person' />
              <Text
                style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 24 }}
              >
                {user.username}
              </Text>
            </CardItem>
            <CardItem
              style={{
                borderRadius: 5,
                padding: 10,
                backgroundColor: '#311B92',
              }}
              cardBody
            >
              {gotAvatar ? (
                <>
              <Image
                source={{ uri: mediaUrl + avatar[0].filename }}
                style={{ height: 200, width: null, flex: 1, borderRadius: 20 }}
              /> 
              </>
              ) : (<></>)}
            </CardItem>
            <CardItem
              style={{
                borderRadius: 5,
                padding: 10,
                backgroundColor: '#311B92',
              }}
            >
              <Body>
                <Text style={{ color: '#ffffff', fontSize: 14 }}>Name</Text>
                <Text style={{ color: '#ffffff', fontSize: 20 }}>
                  {user.full_name}
                </Text>
                <Text style={{ color: '#ffffff', fontSize: 14 }}>Email</Text>
                <Text style={{ color: '#ffffff', fontSize: 20 }}>
                  {user.email}
                </Text>
              </Body>
            </CardItem>
          </Card>
        )}
        {gotAvatar ? (
          <></>
            ) : (
              <>
              <View style={{ padding: 5 }}>
        <Button block style={{ borderRadius: 15, backgroundColor: '#7C4DFF' }} onPress={pickImage}>
          <Icon name={'camera'}></Icon>
          <Text style={{ color: '#fff' }}>Select Avatar</Text>
        </Button>
        </View>
        <View style={{ padding: 5 }}>
        {isLoading && <Spinner color='blue' />}
        <Button
          block
          icon
          style={{ borderRadius: 15, backgroundColor: '#7C4DFF' }}
          disabled={image === null}
          onPress={doAddAvatar}
        >
          <Icon name='send' />
          <Text style={{ color: '#fff', paddingRight: 15 }}>Send Avatar</Text>
        </Button>
        </View>
        </>

            )}
        <View style={{ padding: 5 }}>
        <Button
          style={{ borderRadius: 15, backgroundColor: '#7C4DFF' }}
          block
          onPress={logout}
        >
          <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
            Logout
          </Text>
        </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#311B92',
    borderRadius: 15,
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: '#311B92',
    borderRadius: 15,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
