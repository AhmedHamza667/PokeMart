import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
// import SplashScreen from './views/SplashScreenView';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import Cart from './views/Cart';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    "NexaRegular" : require("./assets/fonts/NexaRegular.otf"),
    "NexaLight" : require("./assets/fonts/NexaLight.otf"),
    "NexaBold" : require("./assets/fonts/NexaBold.otf")
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  if (!fontsLoaded) {
    return undefined;
  }
  else {
    SplashScreen.hideAsync();
  }
  return (
    <>
      {/* <SplashScreen /> */}
      {/* <LoginPage /> */}
      {/* <HomePage /> */}
      <Cart />
    </>
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
