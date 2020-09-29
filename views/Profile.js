import { View } from 'native-base';
import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Profile = () => {
  return (
    <View style={styles.container}>
    <StatusBar style='auto' />
    <Text>THIS IS PROFILE</Text>
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
