import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';


const Home = () => {
  return (
  //  <View style={styles.container}>
   //   <Text>THIS IS HOME</Text>
   //   <StatusBar style='auto' />
    //</View>
  //);
//};
<SafeAreaView style={styles.container}>
      <List navigation={navigation} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;