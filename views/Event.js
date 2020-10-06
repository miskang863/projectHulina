import React, {useEffect, useState} from 'react';
import {Image, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Left,
  Icon,
  Title,
  Text,
  Content,
  Container,
   Button,
} from 'native-base';
import {getComments, postComment, } from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Event = ({route, navigation}) => {
  const [commentArray, setCommentArray] = useState([]);

  const {file} = route.params;
  const allData = JSON.parse(file.description);
  const description = allData.description;
  const dateTime = allData.dateTime;
  const address = allData.address;
  const city = allData.city;


  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text>{file.title}</Text>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: apiUrl + file.filename}}
              style={{height: 400, width: null, flex: 1}}
            />
          </CardItem>

          <CardItem  style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
         
            <Button transparent onPress={() => {navigation.navigate('Comments', {file: file})}}>
              <Icon name={'ios-mail'}></Icon>
            </Button>
         
            <Button transparent onPress={() => {navigation.navigate('Comments')}}>
              <Icon name={'heart'}></Icon>
            </Button>
            <Button transparent>
              <Icon name={'ios-compass'}></Icon>
            </Button>
          </CardItem>
          <CardItem style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <Text>
              {'Address: ' + address + ', ' + city}
            </Text>
            <Text>
              {'Date and time: ' + dateTime}
            </Text>
            <Text>
              {'Information: ' + description}
            </Text>
          </CardItem>
          <CardItem>

          </CardItem>
        </Card>

      </Content>
    </Container>

  );
};

Event.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default Event;