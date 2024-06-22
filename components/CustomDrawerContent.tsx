import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../store/authReducer";
import { RootState } from "../store/store";


const CustomDrawerContent = (props) => {
  const firstName = useSelector((state : RootState) => state.auth.firstName)
  const lastName = useSelector((state: RootState) => state.auth.lastName)
  const profilePicture = useSelector((state: RootState) => state.auth.profilePicture)

  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () =>{
    dispatch(logout());
    router.push("/LogIn");

  }
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={profilePicture}
          style={styles.profileImage}
        />
        <View style={styles.topText}>
          <Text style={styles.profileName}>{firstName + ' ' + lastName}</Text>
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
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="FAQ"
          onPress={() => props.navigation.navigate("faq")}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Terms & Conditions"
          onPress={() => props.navigation.navigate("terms")}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Privacy Policy"
          onPress={() => props.navigation.navigate("privacy")}
          labelStyle={styles.drawerLabel}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.versionText}>V 1.0</Text>
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
