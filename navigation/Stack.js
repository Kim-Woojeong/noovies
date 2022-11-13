import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import { YELLOW_COLOR } from "../colors";

const ScreenOne = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Two")}>
        <Text>Go to Two</Text>
    </TouchableOpacity>
    );
const ScreenTwo = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Three")}>
        <Text>Go to Three</Text>
    </TouchableOpacity>
    );
const ScreenThree = ({navigation: {setOptions}}) => (
    <TouchableOpacity onPress={() => setOptions( {title : "Hello!"})}>
        <Text>Change Title</Text>
    </TouchableOpacity>
    );

const NativeStack = createNativeStackNavigator();

const Stack = () => (
    <NativeStack.Navigator
        screenOptions={{
            presentation: "modal",
            animation: "fade",
            headerTintColor: YELLOW_COLOR,
            headerBackTitleVisible: false,
        }}>
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
);

export default Stack;