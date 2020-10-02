import {useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';


const useLoadEvent = () => {
    const [eventArray, setEventArray] = useState([]);

const loadEvent = async () => {
    try {
      const response = await fetch(apiUrl + 'tags/' + 'helsinginhulinat9999');
      const json = await response.json();
      let event = await Promise.all(
        json.map(async (item) => {
          const resp2 = await fetch(apiUrl + 'media/' + item.file_id);
          const json2 = await resp2.json();
          return json2;
        })
      );
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

  const postEvent = async (formData, userToken) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': userToken,
      },
      data: formData,
      url: apiUrl + 'media',
    };
    console.log('postevent opt', options);
    try {
      const response = await axios(options);
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
    };


    const checkToken = async (token) => {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      try {
        const response = await fetch(apiUrl + 'users/user', options);
        const userData = await response.json();
        if (response.ok) {
          console.log(userData);
          return userData;
        } else {
          throw new Error(userData.message);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    };

    const postTag = async (tag, token) => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(tag),
      };
      try {
        const response = await fetch(apiUrl + 'tags', options);
        const result = await response.json();
        if (response.ok) {
          return result;
        } else {
          throw new Error(result.message);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    };
    
    const postLogIn = async (userCreds) => {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userCreds),
      };
      try {
        const response = await fetch(apiUrl + 'login', options);
        const userData = await response.json();
        if (response.ok) {
          return userData;
        } else {
          throw new Error(userData.message);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    };
    
    const postRegistration = async (newUser) => {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser),
      };
      try {
        console.log(newUser);
        const response = await fetch(apiUrl + 'users', options);
        const result = await response.json();
        if (response.ok) {
          return result;
        } else {
          throw new Error(result.message);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    };



export {useLoadEvent, postEvent, checkToken, postTag, postLogIn, postRegistration,};