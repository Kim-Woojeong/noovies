import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
    <Tab.Navigator
        screenOptions={ {
            tabBarStyle: { backgroundColor: "tomato"}, // 탭의 배경색
            tabBarActiveTintColor: 'red', // 클릭된 탭
            tabBarInactiveTintColor: 'purple', // 클릭되지않은 탭
            headerTitleStyle: {color: "tomato"}, // 헤더 글씨색
        }}>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} /> 
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
);

export default Tabs; 