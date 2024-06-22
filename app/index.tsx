import LoginPage from "./SignUp";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Test from "./Test";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Redirect } from "expo-router";




export default function Page() {
  
    const [fontsLoaded] = useFonts({
      "NexaRegular" : require("../assets/fonts/Nexa-Regular.otf"),
      "NexaLight" : require("../assets/fonts/Nexa-Light.otf"),
      "NexaBold" : require("../assets/fonts/Nexa-Bold.otf")
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
   <Redirect href="/HomePage" />
    // <Test />
  );
}


