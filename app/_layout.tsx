import { View, Text } from "react-native";
import React from "react";
import { Stack, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { store } from "../store/store";
import { Provider } from 'react-redux'


export default function _layout() {
  const navigation = useNavigation();
  return (
    <Provider store={store}>
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="SignUp"
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 20,
            fontFamily: "NexaBold",
          },
          headerTitle: "Sign Up",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
              style={{ marginLeft: 10 }} // Adjust style as needed
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="LogIn"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="userProfile"  options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTitleStyle: {
            color: "#fff",
            fontSize: 20,
            fontFamily: "NexaBold",
          },
          headerTitle: "Profile",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
              style={{ marginLeft: 10 }} // Adjust style as needed
              onPress={() => navigation.goBack()}
            />
          ),
        }}/>

      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(modals)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
    </Provider>
  );
}
