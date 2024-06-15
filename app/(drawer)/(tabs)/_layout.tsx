import { Tabs } from "expo-router";
import React from "react";
import BottomNav from "../../../components/BottomNav";
import TabBar from "../../../components/TabBar";
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function TabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 20,
          fontFamily: "NexaBold",
        },
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
          <Ionicons
            name="person-circle-outline"
            size={24}
            color="#fff"
            style={{ marginRight: 10 }} // Adjust style as needed
            // onPress={() => navigation.goBack()}
          />
        ),
      }}
    >
      <Tabs.Screen name="HomePage" options={{ title: 'Home' }} />
      <Tabs.Screen name="Cart" options={{ title: 'Cart' }} />
    </Tabs>
  );
}
