import { useState } from 'react';
import { validator } from '../validators/validator';

const constraints = {
  comment: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 2,
      message: 'needs to be at least 2 characters.',
    },
  },
};

const useAddCommentForm = (callback) => {
  const [addCommentErrors, setAddCommentErrors] = useState({});
  const [inputs, setInputs] = useState({
    comment: '',
  });

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints);
    setAddCommentErrors((addCommentErrors) => {
      return {
        ...addCommentErrors,
        [name]: error,
      };
    });
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const validateOnSend = () => {
    const commentError = validator('comment', inputs.comment, constraints);

    if (commentError !== null) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleInputChange,
    inputs,
    addCommentErrors,
    validateOnSend,
  };
};

export default useAddCommentForm;
