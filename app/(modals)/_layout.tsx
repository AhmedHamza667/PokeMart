import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function _layout() {
  const navigation = useNavigation();
  return (
    <Stack
    screenOptions={{
      contentStyle: { backgroundColor: "#fff" },
  }}>
        <Stack.Screen 
        name='termsModal' 
        options={{
          headerStyle:{
            backgroundColor: "#000000"
          },
          headerTitleStyle:{
            color: "#fff",
            fontSize: 20,
            fontFamily: "NexaBold",
          },
          headerTitle: "Terms & Conditions",
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

        }} />
     

    </Stack>
  )
}