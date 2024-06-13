import { Tabs } from "expo-router";
import React from "react";
import BottomNav from "../../components/BottomNav";
import TabBar from "../../components/TabBar";
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{  headerStyle:{
        backgroundColor: "#000000"
      },
      headerTitleStyle:{
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
          // onPress={() => navigation.goBack()}
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

        
      }}>
        <Tabs.Screen name="HomePage" options={{title: 'Home'}}></Tabs.Screen>
        <Tabs.Screen name="Cart" options={{title: 'Cart'}}></Tabs.Screen>

    </Tabs>
  );
}

