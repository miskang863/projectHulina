import { useState } from 'react';
import { validator } from '../validators/validator';

const constraints = {
  title: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 2,
      message: 'needs to be at least 2 characters.',
    },
  },
  description: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 4,
      message: 'needs to be at least 4 characters.',
    },
  },
  address: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 3,
      message: 'needs to be at least 3 characters.',
    },
  },
  city: {
    presence: {
      message: 'Cannot be empty.',
    },
    length: {
      minimum: 2,
      message: 'needs to be at least 2 characters.',
    },
  },
};

const useAddEventForm = (callback) => {
  const [addEventErrors, setAddEventErrors] = useState({});
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
  });

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints);
    setAddEventErrors((addEventErrors) => {
      return {
        ...addEventErrors,
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
    const titleError = validator('title', inputs.title, constraints);
    const descriptionError = validator(
      'description',
      inputs.description,
      constraints
    );
    const addressError = validator('address', inputs.address, constraints);
    const cityError = validator('city', inputs.city, constraints);

    if (
      titleError !== null ||
      descriptionError !== null ||
      addressError !== null ||
      cityError == !null
    ) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleInputChange,
    inputs,
    addEventErrors,
    validateOnSend,
  };
};

export default useAddEventForm;
