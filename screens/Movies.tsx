import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from "react-native";
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

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    width: 90%;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
`;

const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;
const Column = styled.View`
  width: 60%;
`;

const Title = styled.Text<{isDark: boolean}>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props)=> (props.isDark ? "white" : props.theme.textColor)};
`;

const Overview = styled.Text<{isDark: boolean}>`
   margin-top: 10px;
   color: ${(props)=> (props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)")};
`;

//styled component 확장
const Vote = styled(Overview)`
  font-size: 12px;  
`;


const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setnowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const {results} = await ( // (중요) 받아온 응답을 열어서 results만 받기! 얘는 실제로 배열임.
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        )
    ).json();
    setnowPlaying(results);
    setLoading(false);
  };

  useEffect(()=>{
    getNowPlaying();
  },[]);

  const isDark = useColorScheme() === "dark";

  return loading ? (
    <Loader>
      <ActivityIndicator /> 
    </Loader>
  ) : (
    <Container>
      <Swiper 
          horizontal
          loop
          autoplay
          autoplayTimeout={3.5}
          showsButtons={false}
          showsPagination={false}
          containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
            {nowPlaying.map((movie) => (
              <View key={movie.id}>
                <BgImg 
                  source={ {url: makeImagePath(movie.backdrop_path)} }
                  style={StyleSheet.absoluteFill}
                />
                <BlurView
                  tint={isDark ? "dark" : "light"}
                  intensity={80}
                  style={StyleSheet.absoluteFill}
                  >
                    <Wrapper>
                        <Poster source={ {url:makeImagePath(movie.poster_path)} } />
                        <Column>
                          <Title isDark={isDark}>{movie.original_title}</Title>
                          { movie.vote_average ? // 평점이 존재할때만 보여주기
                            <Vote isDark={isDark}>⭐️{movie.vote_average}/10 </Vote>
                            : null }
                            {/* 90자까지만 보여주기 */}
                          <Overview isDark={isDark}>{movie.overview.slice(0,90)}...</Overview>
                        </Column>
                    </Wrapper>
                </BlurView>
              </View>
            ))}
      </Swiper>
    </Container>
  )
};

export default Movies;