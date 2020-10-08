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
} from 'native-base';
import { getAvatar } from '../hooks/APIhooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({ navigation }) => {
  const { setIsLoggedIn, user, isLoggedIn } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([{ filename: '' }]);

  const fetchAvatar = async () => {
    setAvatar(await getAvatar());
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log('Profile.js logged in', isLoggedIn);

  console.log('logged in user data:', user);
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
              <Image
                source={{ uri: mediaUrl + avatar[0].filename }}
                style={{ height: 200, width: null, flex: 1, borderRadius: 20 }}
              />
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
        <Button
          style={{ borderRadius: 15, backgroundColor: '#7C4DFF' }}
          block
          onPress={logout}
        >
          <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
            Logout
          </Text>
        </Button>
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
