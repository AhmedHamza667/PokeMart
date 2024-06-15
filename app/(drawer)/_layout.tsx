import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '../../components/CustomDrawerContent';

export default function _layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '85%', // Change this value to take more width of the screen
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
      }}
>
        <Drawer.Screen
          name="aboutUs" 
          options={{
            drawerLabel: 'About Us',
            title: 'About Us',
          }}
        />
        <Drawer.Screen
          name="faq" 
          options={{
            drawerLabel: 'FAQ',
            title: 'FAQ',
          }}
        />
        <Drawer.Screen
          name="terms" 
          options={{
            drawerLabel: 'Terms & Conditions',
            title: 'Terms & Conditions',
          }}
        />
        <Drawer.Screen
          name="privacy" 
          options={{
            drawerLabel: 'Privacy Policy',
            title: 'Privacy Policy',
          }}
        />
        <Drawer.Screen
          name="(tabs)"  
          options={{
            drawerItemStyle: { display: 'none' },
            headerShown: false,
          }}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}
