import React from 'react';
import {Item, Input} from 'react-native';
//import PropTypes from 'prop-types';

const FormTextInput = ({style, ...otherProps}) => {
  return (
    <TextInput
      style={[styles.textInput, style]}
      {...otherProps}
    />
  );
};

export default FormTextInput;