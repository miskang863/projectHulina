import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ListItemHel from './ListItemHel';
import PropTypes from 'prop-types';
import { getComments, useLoadEvent } from '../hooks/APIhooks';

const ListHel = ({ navigation }) => {
  const [eventsHel, setEventsHel] = useState([]);

  const apiUrl = 'http://open-api.myhelsinki.fi/v1/events/?limit=20';
  const loadEvent = async () => {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      const data = json.data;
      let helEvents = [];

      for (let i = 0; i < data.length; i++) {
        const name = data[i].name.fi;
        const description = data[i].description.intro;
        const dateTime = data[i].event_dates.starting_day;
        const address = data[i].location.address;
        const city = data[i].location.address.locality;
        const images = null;
        if (data[i].description.images[0] != null) {
          images = data[i].description.images[0].url;
        }

        const event = {
          name: name,
          description: description,
          datetime: dateTime,
          address: address,
          city: city,
          images: images,
        };
        helEvents.push(event);
      }
      setEventsHel(helEvents);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadEvent();
  }, []);

  return (
    <FlatList
      data={eventsHel}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ListItemHel navigation={navigation} singleEvent={item} />
      )}
    ></FlatList>
  );
};

export default ListHel;
