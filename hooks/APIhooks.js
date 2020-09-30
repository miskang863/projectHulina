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
         console.log('loadEvent', event);
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



export {useLoadEvent,};