import React from "react";
import styled from "styled-components/native";

// 이 파일에서 다크모드인지 아닌지를 판단할 필요없음!

const Btn = styled.TouchableOpacity` 
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
  `;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  `;

// Btn과 Title로 컴포넌트 변경
const Movies = ({ navigation: {navigate}}) => (
  <Btn onPress={()=> navigate("Stack", {screen: "Three"})}>
    <Title>Movies</Title>
  </Btn>
);

export default Movies;