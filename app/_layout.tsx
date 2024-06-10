import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name='LoginPage' options={{
            headerShown: false,
        }} />
        <Stack.Screen name='HomePage' options={{
            headerShown: false,
        }}/>
        <Stack.Screen name='Cart' options={{
            headerShown: false,
        }}/>

    </Stack>
  )
}