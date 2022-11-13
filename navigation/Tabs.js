import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {

    const isDark = useColorScheme() === "dark"; // dark와 light를 반환받는 대신 t/f를 받자.

    return ( // color scheme에 접근해야해서 return을 넣음.
        <Tab.Navigator
            screenOptions={ {
                tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white"}, // 탭의 배경색
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR, // 클릭된 탭
                tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY, // 클릭되지않은 탭
                headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white"},
                headerTitleStyle: {color: isDark ? "white" : BLACK_COLOR}, // 헤더 글씨색
            }}>
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Tv" component={Tv} /> 
        <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    );
};

export default Tabs; 