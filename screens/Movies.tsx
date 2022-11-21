import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, ScrollView } from "react-native";
import Slide from "../component/Slide";
import Poster from "../component/Poster";

const API_KEY = "48a6ca256cf4aff764d5e59b8b021dd2";
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: white;
  font-size: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HMovie = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  padding: 0px 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setnowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        )
    ).json();
    setnowPlaying(results);
    setLoading(false);
  };

  const getTrending = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        )
    ).json();
    setTrending(results);
    console.log(results[0].original_title.slice(0,5));
  };

  const getUpcoming = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        )
    ).json();
    setUpcoming(results);
  };

  const getData = async() => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  }
  

  useEffect(()=>{
    getData();
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
          containerStyle={{ marginBottom: 40, width: "100%", height: SCREEN_HEIGHT / 4 }}>
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

      <ListContainer>
          <ListTitle>Trending Movie</ListTitle>
          <TrendingScroll 
            contentContainerStyle={{ paddingLeft: 30 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {trending.map((movie) => (
              <Movie key={movie.id}>
                <Poster path={movie.poster_path}/>
                <Title>
                  {movie.original_title.slice(0, 13)}
                  {movie.original_title.length > 13 ? "..." : null}
                </Title>
                <Votes>⭐️ {movie.vote_average}/10</Votes>
              </Movie>
              ))}
          </TrendingScroll>
        </ListContainer>
        <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          {upcoming.map((movie) => (
            <HMovie key={movie.id}>
              <Poster path={movie.poster_path}/>
              <HColumn>
                <Title>{movie.original_title}</Title>
                <Release>{new Date(movie.release_date).toLocaleDateString("ko", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}</Release>
                <Overview>
                  {movie.overview !== "" && movie.overview.length > 80
                   ? `${movie.overview.slice(0, 140)}...`
                  : movie.overview}
                </Overview>
              </HColumn>
          </HMovie>
        ))}
    </Container>
  );
};

export default Movies;