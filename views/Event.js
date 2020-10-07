import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Icon,
  Text,
  Content,
  Container,
  Button,
  Header,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../contexts/AuthContext';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import moment from 'moment';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Event = ({ route, navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [videoRef, setVideoRef] = useState(null);

  const { file } = route.params;
  const allData = JSON.parse(file.description);
  const description = allData.description;
  const dateTime = allData.dateTime;
  const address = allData.address;
  const city = allData.city;

  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.presentFullscreenPlayer();
    } catch (e) {
      console.log('svifs error', e.message);
    }
  };

  const unlock = async () => {
    await ScreenOrientation.unlockAsync();
  };

  const lock = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  useEffect(() => {
    unlock();
    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        showVideoInFullscreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListeners(orientSub);
      lock();
    };
  }, []);

  return (
    <Container>
      <Content padder style={styles.container}>
        <StatusBar backgroundColor='#140078' barStyle='light-content' />
        <Card transparent style={styles.card}>
          <CardItem header style={styles.header}>
            <Text style={{ color: '#ffffff', fontSize: 25, fontWeight: 'bold' }}>{file.title}</Text>
          </CardItem>
          <CardItem
            cardBody
            style={{ borderRadius: 5, padding: 10, backgroundColor: '#311B92' }}
          >
            {file.media_type === 'image' ? (
              <Image
                source={{ uri: apiUrl + file.filename }}
                style={{
                  height: 350,
                  width: null,
                  flex: 1,
                  borderRadius: 5,
                  padding: 5,
                }}
              />
            ) : (
              <Video
                ref={handleVideoRef}
                source={{ uri: apiUrl + file.filename }}
                style={{ height: 300, width: null, flex: 1 }}
                useNativeControls={true}
                resizeMode='cover'
              />
            )}
          </CardItem>
          <CardItem
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              backgroundColor: '#311B92',
            }}
          >
            {isLoggedIn ? (
              <>
                <Button
                  iconLeft
                  info
                  transparent
                  onPress={() => {
                    navigation.navigate('Comments', { file: file });
                  }}
                >
                  <Icon name={'ios-mail'}></Icon>
                  <Text style={{ color: '#ffffff' }}>Comments</Text>
                </Button>
              </>
            ) : (
              <></>
            )}
          </CardItem>
          <CardItem
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundColor: '#311B92',

              borderRadius: 20,
            }}
          >
            <Text style={{ color: '#ffffff' }}>
              {'Information: ' + description}
            </Text>
            <Text style={{ color: '#ffffff' }}>
              {'Address: ' + address + ', ' + city}
            </Text>
            <Text style={{ color: '#ffffff' }}>
              {'Date and time: ' +
                moment(dateTime).format('MMMM Do YYYY, HH:mm')}
            </Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#546E7A',

    paddingTop: 10,
    //  paddingHorizontal: 5,
  },
  card: {
    backgroundColor: '#311B92',
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: '#311B92',
    borderRadius: 15,
  },
});

Event.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Event;
