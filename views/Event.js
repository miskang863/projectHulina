import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
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

const Event = ({route}) => {
  // const [comment, setComment] = useState([{}]);
  const [commentArray, setCommentArray] = useState([{}]);

  const {file} = route.params;
  const allData = JSON.parse(file.description);
  const description = allData.description;
  const dateTime = allData.dateTime;
  const address = allData.address;
  const city = allData.city;


  const doComment = async () => {
  try{
    const userToken = await AsyncStorage.getItem('userToken');
   await postComment(
    {
      file_id: file.file_id,
      comment: 'Tosi hieno Commentti :D',
    },
    userToken
  );
  } catch(e) {
    console.log('Comment error', e.message);
  }
  };

  

 // TÄMÄ TOIMII; KORJAA VIELÄ KUNTOON
const funcker = async ()=> { 
let array =  await getComments(file.file_id);
console.log('TÄMÄ ON VITT UEVENTTET', array);
};
funcker();
//   const fetchComment = async (file_id) => {
//       setComment(await getComments(file_id));
//       console.log(comment);
// };

// useEffect(() => {
//    fetchComment(file.file_id);
// }, []);

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
         
            <Button transparent onPress={doComment}>
              <Icon name={'ios-mail'}></Icon>
            </Button>
         
            <Button transparent onPress={doComment}>
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
            <Text>
dfa            </Text>
          </CardItem>
        </Card>
      </Content>
    </Container>

  );
};

Event.propTypes = {
  route: PropTypes.object,
};

export default Event;