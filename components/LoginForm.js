import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postLogIn} from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import { Form, Button, Text } from 'native-base';

const LoginForm = ({navigation}) => {
  //tämä on rikki
  const {setIsLoggedIn}  = useContext(AuthContext);
  // const {setIsLoggedIn} = useContext(AuthContext);
  const {handleInputChange, inputs} = useLoginForm();
  const doLogin = async () => {
    
    try {
      const userData = await postLogIn(inputs);
      console.log('user login success:', userData);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (e) {
      console.log('login error', e.message);
    }
    // navigation.navigate('Home');
  };


  return (
    <Form>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button block onPress={doLogin}>
        <Text>Login!</Text>
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;