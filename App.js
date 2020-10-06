import React, {useState, useEffect, useContext} from 'react';
import Navigator from './navigator/Navigator';
import {AuthProvider} from './contexts/AuthContext';
import * as Expo from 'expo';
import * as Font from 'expo-font';

const App = () => {
  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    setFontReady(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontReady) {
    console.log('Waiting for fonts...');
    return (
      <Expo.AppLoading />
    );
  }

  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;