import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SplashScreen from './views/SplashScreenView';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import Cart from './views/Cart';

export default function App() {
  return (
    <>
      {/* <SplashScreen /> */}
      {/* <LoginPage /> */}
      <HomePage />
      {/* <Cart /> */}
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
