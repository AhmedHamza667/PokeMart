import { Tabs } from "expo-router";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";

export default () => {  
    const Tab = createBottomTabNavigator();
    return (
        <Tabs screenOptions={({route}) => ({
            tabBarIcon: ({focused, size}) => {
              let iconName;
              if (route.name === 'HomePage') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              }
              return <Ionicons name={iconName} size={size} color={'black'} />;
            },
            tabBarLabelStyle: {
              color: 'black',
            },
            tabBarStyle: {
              backgroundColor: 'white',
              borderRadius: 63,
              marginHorizontal: 20,
            //   marginBottom: 10,
            //   paddingVertical: 10,
              shadowColor: '#000000',
              height: 76,
              shadowOffset: {
                width: 0,
                height: 14,
              },
              shadowRadius: 3.5,
              elevation: 5,
              position: 'absolute',
              
            },
            tabBarItemStyle: {
                borderRadius: 63,
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center',
            },
        
            
            headerShown: false,
            tabBarActiveBackgroundColor: '#1170FF2E',
            
            
          })}>  
            <Tabs.Screen name="HomePage"
            options={{
                headerTitle: 'Home',
                title: 'Home',
                tabBarIconStyle: {
                    top: 10,
                },
                tabBarLabelStyle:{
                    top: 10,
                    color: '#000000'
                },
            }}/>
            <Tabs.Screen name="Cart"
            options={{
                headerTitle: 'Cart',
                title: 'Cart',
                tabBarIconStyle: {
                    top: 10,
                },
                tabBarLabelStyle:{
                    top: 10,
                    color: '#000000'
                },
            }}
            />
        </Tabs>
    );
};