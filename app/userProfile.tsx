import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
import { updateProfilePicture } from '../store/authReducer'


const userProfile = () => {
  const [wishList, setWishList] = useState(12);
  const cartItems = useSelector((state: RootState) => state.cart.badge);
  const { firstName, lastName, email, profilePicture } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handlePickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const uri = pickerResult.uri;
      dispatch(updateProfilePicture(uri));
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View>
          <Image
            source={profilePicture}
            style={styles.profileImage}
          />
          <Pressable onPress={handlePickImage}>
          <View style={styles.camera}>
            <Ionicons name="camera" size={22} color="gray" />
          </View>
          </Pressable>
        </View>
        <Text style={styles.userName}>{firstName + " " + lastName}</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.box}>
          <Pressable>
            <Ionicons name="heart" size={22} color="red" />
            <Text style={styles.boxText}>Wishlist</Text>
            <Text style={styles.boxNum}>{wishList}</Text>
            <View style={styles.arrow}>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Pressable>
        </View>
        <View style={styles.box}>
          <Pressable onPress={() => router.push("/Cart")}>
            <Ionicons name="cart" size={22} color="black" />
            <Text style={styles.boxText}>Cart</Text>
            <Text style={styles.boxNum}>{cartItems}</Text>
            <View style={styles.arrow}>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.personal}>
        <View style={styles.infoHeader}>
          <Text style={styles.infoHeader}>Personal Information</Text>
          <Text style={styles.edit}>Edit</Text>
        </View>
        <View style={[styles.info, styles.name]}>
          <View style={styles.icon}>
            <Ionicons name="person-outline" size={18} color="black" />
          </View>
          <Text>{firstName + " " + lastName}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.icon}>
            <Ionicons name="mail-outline" size={18} color="black" />
          </View>
          <Text>{email}</Text>
        </View>
      </View>
    </View>
  );
};

export default userProfile;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
  },
  user: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 24,
  },
  profileImage: {
    width: 122,
    height: 122,
    borderRadius: 100,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  camera: {
    width: 46,
    height: 46,
    backgroundColor: "#DEE0E4",
    borderRadius: 50,
    position: "absolute",
    bottom: -10,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#F3F8FF",
    borderWidth: 1,
    borderColor: "#D1E2F9",
    borderRadius: 9,
    width: 166,
    height: 110,
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginTop: 25,
  },
  boxNum: {
    fontSize: 24,
    fontWeight: "bold",
  },
  boxText: {
    paddingTop: 12,
  },
  arrow: {
    position: "absolute",
    bottom: 15,
    right: 6,
  },
  edit: {
    fontSize: 14,
    color: "#1053B2",
    fontWeight: "bold",
  },
  infoHeader: {
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "space-between",
  },
  personal: {
    borderWidth: 1,
    borderColor: "#E7E7E7",
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  info: {
    flexDirection: "row",
    marginTop: 15,
  },
  name: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#F1F1F1",
  },
  icon: {
    marginRight: 10,
  },
});
