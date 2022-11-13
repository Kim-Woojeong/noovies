import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";

const ScreenOne = ({navigation: {navigate}}) => (
    // 같은 네비게이터에 있을때
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to Two</Text>
  </TouchableOpacity>
  );
  // 같은 네비게이터에 있을때
const ScreenTwo = ({navigation: {navigate}}) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to Three</Text>
  </TouchableOpacity>
  );

const ScreenThree = ({navigation: {navigate}}) => (
    // 다른 네비게이터일 때
  <TouchableOpacity onPress={()=> navigate("Tabs", {screen:"Search"})}>
    <Text>Change Title</Text>
  </TouchableOpacity>
  );

const NativeStack = createNativeStackNavigator();

const Stack = () =>
    <NativeStack.Navigator
      screenOptions = {{
        headerBackTitleVisible: false,
      }}
      >
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>

export default Stack;