import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from 'expo-splash-screen';
import { Text, useColorScheme, View } from 'react-native';
import * as Font from 'expo-font';
import Tabs from './navigation/Tabs';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { darkTheme, lightTheme } from './styled';

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

  const isDark = useColorScheme() === "dark"; // hook은 한번만 쓰면됨!

  if (!appIsReady) {
    return null;
  }

  return (
    // ThemeProvider라는 새로운 컴포넌트를 사용해서 테마를 적용해보자. props로 theme을 내려주면 모든 스크린에서 theme에 접근할수있음.
    <ThemeProvider theme = {isDark ? darkTheme : lightTheme}>
      <NavigationContainer >
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
