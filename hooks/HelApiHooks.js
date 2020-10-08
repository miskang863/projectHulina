import { useState, useEffect } from 'react';

const apiUrl = 'http://open-api.myhelsinki.fi/v1/events/';

const useLoadEvent = () => {
  const [eventArray, setEventArray] = useState([]);

  const loadEvent = async () => {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      console.log(json);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadEvent();
  }, []);

  return json;
};

export { loadEvent };
