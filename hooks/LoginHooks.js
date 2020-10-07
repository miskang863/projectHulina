import {useState} from 'react';
import { validator } from '../validators/validator';

const constraints = {
  username: {
    presence: {
      message: '^Please enter a username',
    },
    length: {
      minimum: 3,
      message: 'Minimum length is 3 chars',
    },
  },
  password: {
    presence: {
      message: 'Please enter a password',
    },
    length: {
      minimum: 5,
      message: 'Minimum length is 5 chars',
    },
  },
};

const useLoginForm = (callback) => {
  const [loginErrors, setLoginErrors] = useState({});
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints);
    setLoginErrors((loginErrors) => {
      return {
        ...loginErrors,
        [name]: error,
      };
    });
  setInputs((inputs) => {
    return {
      ...inputs,
      [name]: text,
    };
  });
  }

const validateOnSend = () => {
  const usernameError = validator('username', inputs.username, constraints);
  const passwordError = validator('password', inputs.password, constraints);

  if (usernameError !== null || passwordError !== null) {
    return false;
  } else {
    return true;
  }
};

  
  return {
    handleInputChange,
    validateOnSend,
    loginErrors,
    inputs,
  };
};

export default useLoginForm;