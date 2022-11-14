import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import * as Font from 'expo-font';
import Tabs from './navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from './styled';

const loadFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);

        await new Promise(resolve => setTimeout(resolve, 2000));
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
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const isDark = useColorScheme() === "dark";

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme = {isDark ? darkTheme : lightTheme}>
      <NavigationContainer >
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
