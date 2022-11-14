import React from "react";
import styled from "styled-components/native";
import { StyleSheet, useColorScheme } from "react-native";
import { makeImagePath } from "../utils";
import { BlurView } from 'expo-blur';

const View = styled.View`
  flex: 1;
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

const Vote = styled(Overview)`
  font-size: 12px;  
`;

interface SlideProps {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    overview: string;
}

const Slide:React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview,
}) => {
    const isDark = useColorScheme() === "dark";

    return (
        // key={movie.id} 없앰.
        <View>
            <BgImg 
                source={ {url: makeImagePath(backdropPath)} }
                style={StyleSheet.absoluteFill}
            />
            <BlurView
                tint={isDark ? "dark" : "light"}
                intensity={80}
                style={StyleSheet.absoluteFill}
                >
                <Wrapper>
                    <Poster source={ {url:makeImagePath(posterPath)} } />
                    <Column>
                        <Title isDark={isDark}>{originalTitle}</Title>
                        { voteAverage ? // 평점이 존재할때만 보여주기
                        <Vote isDark={isDark}>⭐️{voteAverage}/10 </Vote>
                        : null }
                        {/* 90자까지만 보여주기 */}
                        <Overview isDark={isDark}>{overview.slice(0,90)}...</Overview>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    )
}

export default Slide;
