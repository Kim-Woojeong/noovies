import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import Slide from "../component/Slide";

const API_KEY = "48a6ca256cf4aff764d5e59b8b021dd2";
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setnowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const {results} = await (
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
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                />
            ))}
      </Swiper>
    </Container>
  )
};

export default Movies;