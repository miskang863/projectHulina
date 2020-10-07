import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const useLoadEvent = () => {
  const [eventArray, setEventArray] = useState([]);

  const loadEvent = async () => {
    try {
      const response = await fetch(apiUrl + 'tags/' + 'helsinginhulinat666');
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

const useLoadComments = async (file_id) => {
  const [commentArray, setCommentArray] = useState([]);
  const loadComment = async () => {
    try {
      let response = await fetch(apiUrl + 'comments/file/' + file_id);
      let json = await response.json();
      let comment = Promise.all(json);
      setCommentArray(comment);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadComment();
  }, []);
  // console.log('comment array', commentArray)

  return commentArray;
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

const getUser = async (token) => {
  const options = {
    method: 'GET',
    headers: { 'x-access-token': token },
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

const getUserForComs = async (token, id) => {
  const options = {
    method: 'GET',
    headers: { 'x-access-token': token },
  };
  try {
    const response = await fetch(apiUrl + 'users/' + id, options);
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

const postComment = async (comment, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(comment),
  };
  try {
    const response = await fetch(apiUrl + 'comments', options);
    const result = await response.json();
    console.log('comment resp: ', result);
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
  console.log("loggedIn");
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
  delete newUser.confirmPassword;
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser),
  };
  try {
    console.log('newUser obj', newUser);
    console.log('reg options', options);
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

const checkAvailable = async (username) => {
  try {
    const response = await fetch(apiUrl + 'users/username/' + username);
    const resultData = await response.json();
    if (response.ok) {
      if (resultData.available) {
        return '';
      } else {
        return 'Username ' + username + ' is not available.';
      }
    } else {
      throw new Error(resultData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};


export {
  useLoadEvent,
  postEvent,
  checkToken,
  postTag,
  postLogIn,
  postRegistration,
  postComment,
  useLoadComments,
  getUser,
  getUserForComs,
  getAvatar,
  checkAvailable,
};
