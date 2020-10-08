import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIhooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { StyleSheet, Title, Icon, Container, Content, Text} from 'native-base';

const Login = ({navigation}) => { // props is needed for navigation  
    const {setIsLoggedIn, setUser, user} = useContext(AuthContext);

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

      // console.log('Login.js', user);

      return (
        <Container>
          <Content padder>
            <Title></Title>
            <Text style = {{color: '#445963', fontSize: 18, textAlign: "center", fontWeight: "bold"}}>Helsingin Hulinat App</Text>
            
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