import React from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, Content, Container } from 'native-base';
import moment from 'moment';

const SingleHelEvent = ({ route, navigation }) => {
  const { file } = route.params;

  return (
    <Container>
      <Content padder style={styles.container}>
        <StatusBar backgroundColor='#140078' barStyle='light-content' />
        <Card transparent style={styles.card}>
          <CardItem header style={styles.header}>
            <Text
              style={{ color: '#ffffff', fontSize: 25, fontWeight: 'bold' }}
            >
              {file.name}
            </Text>
          </CardItem>
          <CardItem
            cardBody
            style={{ borderRadius: 5, padding: 10, backgroundColor: '#311B92' }}
          >
            <Image
              source={{ uri: file.images }}
              style={{
                height: 350,
                width: null,
                flex: 1,
                borderRadius: 5,
                padding: 5,
              }}
            />
          </CardItem>
          <CardItem
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundColor: '#311B92',

              borderRadius: 20,
            }}
          >
            <Text
              style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20 }}
            >
              Info
            </Text>
            <Text style={{ color: '#ffffff' }}>{file.description}</Text>
            <Text style={{ color: '#ffffff', fontSize: 12 }}>
              {file.address.street_address}
            </Text>
            <Text style={{ color: '#ffffff', fontSize: 12 }}>
              {moment(file.datetime).format('MMMM Do YYYY, HH:mm')}
            </Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#546E7A',
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#311B92',
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: '#311B92',
    borderRadius: 15,
  },
});

SingleHelEvent.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  file: PropTypes.object,
};

export default SingleHelEvent;
