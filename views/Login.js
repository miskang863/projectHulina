import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { checkToken } from '../hooks/APIhooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Title, Container, Content } from 'native-base';

const Login = ({ navigation }) => {
  const { setIsLoggedIn, setUser, user } = useContext(AuthContext);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        console.log('token valid', userData);
        setIsLoggedIn(true);
        setUser(userData);
      } catch (e) {
        console.log('token check failed', e.message);
      }
    }
  };
  useEffect(() => {
    getToken();
    console.log('USER', user);
  }, []);

  return (
    <Container>
      <Content padder>
        <Title></Title>
        <LoginForm navigation={navigation} />
        <RegisterForm navigation={navigation} />
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
