import { Tabs } from "expo-router";
import React from "react";
import BottomNav from "../../components/BottomNav";
import TabBar from "../../components/TabBar";

export default function TabsLayout() {

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false, }}>
        <Tabs.Screen name="HomePage" options={{title: 'Home'}}></Tabs.Screen>
        <Tabs.Screen name="Cart" options={{title: 'Cart'}}></Tabs.Screen>

    </Tabs>
  );
}

