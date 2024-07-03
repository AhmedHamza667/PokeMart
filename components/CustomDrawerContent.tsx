import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../store/authReducer";
import { RootState } from "../store/store";
import * as SecureStore from 'expo-secure-store';
import { useTheme } from "@shopify/restyle";
import { Theme } from '../theme';


const CustomDrawerContent = (props) => {
  const firstName = useSelector((state : RootState) => state.auth.firstName)
  const lastName = useSelector((state: RootState) => state.auth.lastName)
  const profilePicture = useSelector((state: RootState) => state.auth.profilePicture)

  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () =>{
    dispatch(logout());
    await SecureStore.deleteItemAsync("token");
    router.push("/LogIn");
  }
  const theme = useTheme<Theme>();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: theme.colors.background}}>
      <View style={styles.header}>
        <Image
          source={profilePicture}
          style={styles.profileImage}
        />
        <View style={styles.topText}>
          <Text style={[[styles.profileName, {color: theme.colors.text}]]}>{firstName + ' ' + lastName}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("userProfile")}
          >
            <Text style={styles.profileLink}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <DrawerItem
          label="About Us"
          onPress={() => props.navigation.navigate("aboutUs")}
          labelStyle={[styles.drawerLabel, {color: theme.colors.text}]}
        />
        <DrawerItem
          label="FAQ"
          onPress={() => props.navigation.navigate("faq")}
          labelStyle={[styles.drawerLabel, {color: theme.colors.text}]}
        />
        <DrawerItem
          label="Terms & Conditions"
          onPress={() => props.navigation.navigate("terms")}
          labelStyle={[styles.drawerLabel, {color: theme.colors.text}]}
        />
        <DrawerItem
          label="Privacy Policy"
          onPress={() => props.navigation.navigate("privacy")}
          labelStyle={[styles.drawerLabel, {color: theme.colors.text}]}
        />
      </View>
      <View style={styles.footer}>
        <Text style={[styles.versionText, {color: theme.colors.text}]}>V 1.0</Text>
        <TouchableOpacity
          style={styles.logout}
          onPress={handleLogout}
        >
          <Ionicons name="exit-outline" size={22} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginBottom: 10,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "NexaBold",
    fontWeight: "bold",
    marginBottom: 15,
  },
  profileLink: {
    color: "#6F7789",
    fontFamily: "Nexa",
  },
  body: {
    flex: 1,
  },
  footer: {
    padding: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  versionText: {
    color: "#000",
    textAlign: "center",
  },
  topText: {
    flexDirection: "column",
    flex: 1,
  },
  drawerLabel: {
    color: "#000",
    fontFamily: "Nexa",
    fontSize: 16,
  },
  logout: {
    flexDirection: "row",
  },
  logoutText: {
    color: "red",
    paddingLeft: 3,
  },
});

export default CustomDrawerContent;
