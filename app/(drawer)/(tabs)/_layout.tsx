import { Tabs } from "expo-router";
import React from "react";
import BottomNav from "../../../components/BottomNav";
import TabBar from "../../../components/TabBar";
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store'
import { TouchableOpacity, View, Text } from "react-native";

export default function TabsLayout() {
  const navigation = useNavigation();
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
// Extract initials
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 20,
          fontFamily: "NexaBold",
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={24}
            color="#fff"
            style={{ marginLeft: 10 }} // Adjust style as needed
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('userProfile')}
            style={{ marginRight: 10 }} // Adjust style as needed
          >
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: '#000', fontWeight: 'bold' }}>{initials}</Text>
            </View>
          </TouchableOpacity>
        )
      ,
    
      }}
    >
      <Tabs.Screen name="HomePage" options={{ title: 'Home' }} />
      <Tabs.Screen name="Cart" options={{ title: 'Cart' }} />
    </Tabs>
  );
}
