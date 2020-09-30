import {useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';


const useLoadEvent = () => {
    const [eventArray, setEventArray] = useState([]);

const loadEvent = async () => {
    try {
        const response = await fetch(apiUrl + 'media');
        const json = await response.json();
        const event = await Promise.all(json.map(async (item) => {
          const resp2 = await fetch(apiUrl + 'media/' + item.file_id);
          const json2 = await resp2.json();
          return json2;
        }));
        setEventArray(event);
      } catch (e) {
        console.error(e);
      }
    };
    useEffect(() => {
      loadEvent();
    }, []);
  
    return eventArray;
  };

  const postEvent = async (fd, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      data: fd,
      url: apiUrl + 'media',
    };
    try {
      const response = await axios(options);
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
    };

export {useLoadEvent, postEvent,};