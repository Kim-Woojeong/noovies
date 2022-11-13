import React from "react";
// import { StyleSheet, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity` 
  flex: 1;
  justify-content: center;
  align-items: center;
  `;

const Title = styled.Text`
  color: ${ (props) => (props.selected ? "blue" : "red")};
  `;

const Movies = ({ navigation: {navigate}}) => ( // Btn과 Title로 컴포넌트 변경
  <Btn onPress={()=> navigate("Stack", {screen: "Three"})}>
    <Title selected={false}>Movies</Title>
    <Title selected={true}>Movies</Title>
  </Btn>
);

export default Movies;