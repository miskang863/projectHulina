import React from 'react';
import { Input, Item, Label } from 'native-base';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const FormTextInput = ({ style, error, ...otherProps }) => {
  return (
    <View>
      <Item>
        <Input {...otherProps} />
      </Item>
      {error !== '' && <Label>{error}</Label>}
    </View>
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
};

export default FormTextInput;
