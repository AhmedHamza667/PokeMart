import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './views/SplashScreenView';
import LoginPage from './views/LoginPage';

export default function App() {
  return (
    // <SplashScreen />
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
