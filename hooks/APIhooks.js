import {useState, useEffect} from 'react';
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
         //console.log('loadEvent', event);
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
  
  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      const response = await fetch(apiUrl + 'users/user', options);
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
  
  const getAvatar = async () => {
    try {
      const response = await fetch(apiUrl + 'tags/avatar_772');
      const avatarImages = await response.json();
      if (response.ok) {
        return avatarImages;
      } else {
        throw new Error(avatarImages.message);
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };
  
  export {
    useLoadEvent,
    postLogIn,
    checkToken,
    postRegistration,
    getAvatar,
  };


