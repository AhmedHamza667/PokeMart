import { Tabs } from "expo-router";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default () => {  
    const Tab = createBottomTabNavigator();
    const badge = 2;
    const route = useRoute();
    return (
        <Tabs screenOptions={({route}) => ({
            tabBarIcon: ({focused, size}) => {
              let iconName;
              if (route.name === 'HomePage') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              }
              return (<View style={styles.iconContainer}>
                <Ionicons name={iconName} size={size} color={'black'} />
                {route.name === 'Cart' && focused && badge > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                )}
            </View>);
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
const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -16,
        top: 5,
        backgroundColor: '#00388E',
        borderRadius: 6,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'NexaBold',
        textAlign: 'center'
    }
});
