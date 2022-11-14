import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { makeImagePath } from "../utils";
import { BlurView } from 'expo-blur';

const API_KEY = "48a6ca256cf4aff764d5e59b8b021dd2";
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

const Title = styled.Text``;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setnowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const {results} = await ( // (중요) 받아온 응답을 열어서 results만 받기! 얘는 실제로 배열임.
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
        )
    ).json();
    setnowPlaying(results);
    setLoading(false);
  };

  useEffect(()=>{
    getNowPlaying();
  },[]);

  return loading ? (
    <Loader>
      <ActivityIndicator /> 
    </Loader>
  ) : (
    <Container>
      <Swiper 
          loop
          timeout={3.5}
          controlsEnabled={false}
          containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
            {nowPlaying.map((movie) => (
              <View key={movie.id}>
                <BgImg 
                  source={ {url: makeImagePath(movie.backdrop_path)} }
                  style={StyleSheet.absoluteFill}
                  />
                <BlurView
                  intensity={80}
                  style={StyleSheet.absoluteFill}
                  >
                  <Title>{movie.original_title}</Title>
                </BlurView>
              </View>
            ))}
      </Swiper>
    </Container>
  )
};

export default Movies;