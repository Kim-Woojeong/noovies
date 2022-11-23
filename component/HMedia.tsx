import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

interface HMediaProps {
    posterPath: string,
    originalTitle: string,
    releaseDate: string,
    overview: string,
}

const HMovie = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  padding: 0px 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
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

const HMedia: React.FC<HMediaProps> = ({
    posterPath,
    originalTitle,
    releaseDate,
    overview,
}) => (

    <HMovie>
        <Poster path={posterPath}/>
        <HColumn>
        <Title>{originalTitle}</Title>
        <Release>{new Date(releaseDate).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })}</Release>
        <Overview>
            {overview !== "" && overview.length > 80
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
        </HColumn>
    </HMovie>
);

export default HMedia;