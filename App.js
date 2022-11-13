import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from 'expo-splash-screen';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import Tabs from './navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './navigation/Stack';
import Root from './navigation/Root';

// SplashScreen.preventAutoHideAsync();

const loadFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);

        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초뒤에 이 promise를 resolve한다고 하자.
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync(); // 숨기기
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}
