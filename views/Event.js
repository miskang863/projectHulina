import React, { useContext, useEffect, useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Icon,
  Text,
  Content,
  Container,
  Button,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../contexts/AuthContext';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

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
      <Content padder>
        <Card>
          <CardItem style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text>{file.title}</Text>
          </CardItem>
          <CardItem cardBody>
            {file.media_type === 'image' ? (
              <Image
                source={{ uri: apiUrl + file.filename }}
                style={{ height: 400, width: null, flex: 1 }}
              />
            ) : (
              <Video
                ref={handleVideoRef}
                source={{ uri: apiUrl + file.filename }}
                style={{ height: 400, width: null, flex: 1 }}
                useNativeControls={true}
                resizeMode='cover'
                // posterSource={{ uri: mediaUrl + file.screenshot }}
                // posterStyle={{ height: 400, width: null, flex: 1 }}
                // usePoster={true}
                // onError={(err) => {
                //   setError(true);
                //   console.log('vide error', err);
                // }}
              />
            )}
          </CardItem>
          <CardItem
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            {isLoggedIn ? (
              <>
                <Button
                  transparent
                  onPress={() => {
                    navigation.navigate('Comments', { file: file });
                  }}
                >
                  <Icon name={'ios-mail'}></Icon>
                </Button>
              </>
            ) : (
              <></>
            )}
          </CardItem>
          <CardItem
            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Text>{'Address: ' + address + ', ' + city}</Text>
            <Text>{'Date and time: ' + dateTime}</Text>
            <Text>{'Information: ' + description}</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Event.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Event;
