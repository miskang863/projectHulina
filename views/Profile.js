import { View } from 'native-base';
import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

const Profile = () => {
  return (
    <View>
      <Text>PROFIILI</Text>
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
