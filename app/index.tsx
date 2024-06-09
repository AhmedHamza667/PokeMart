import { StyleSheet, Text, View } from "react-native";
import HomePage from "./HomePage";
import LoginPage from "../views/LoginPage";
import Cart from "./Cart";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';



export default function Page() {
  
    const [fontsLoaded] = useFonts({
      "NexaRegular" : require("../assets/fonts/NexaRegular.otf"),
      "NexaLight" : require("../assets/fonts/NexaLight.otf"),
      "NexaBold" : require("../assets/fonts/NexaBold.otf")
    });
    useEffect(() => {
      async function prepare() {
        await SplashScreen.preventAutoHideAsync();
      }
      prepare();
    }, []);
    if (!fontsLoaded)  {
      return undefined;
    }
    else {
      SplashScreen.hideAsync();
    }
  
  return (
   <LoginPage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
