import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIhooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Title, Text, Container, Content, Icon, StyleSheet} from 'native-base';
 

const Login = ({navigation}) => { // props is needed for navigation  
    const {setIsLoggedIn, setUser, user} = useContext(AuthContext);
    const [showRegistration, setShowRegistration] = useState(true);
    // console.log('Login', isLoggedIn);

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
          <Title>
            <Icon name='planet' style={{fontSize: 200}} />
          </Title>
          {showRegistration ?
            <LoginForm navigation={navigation} /> :
            <RegisterForm navigation={navigation} />
          }
          <View style={{alignItems: 'center'}}>
            <Text>or</Text>
          </View>
          <Button block onPress={() => {
            setShowRegistration(!showRegistration);
          }}>
            <Text>{showRegistration ? 'Register' : 'Login'}</Text>
          </Button>
        </Content>
      </Container>
    );
             
        };
  
  Login.propTypes = {
    navigation: PropTypes.object,
  };
  
  export default Login;