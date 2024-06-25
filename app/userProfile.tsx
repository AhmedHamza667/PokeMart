import { Image, Pressable, StyleSheet, Text, View, Modal, Button, KeyboardAvoidingView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePicture } from '../store/authReducer'
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from "react-native-gesture-handler";
import { updateUserDetails} from '../store/authReducer';
import { SafeAreaView } from "react-native-safe-area-context";



const userProfile = () => {
  const [wishList, setWishList] = useState(12);
  const cartItems = useSelector((state: RootState) => state.cart.badge);
  const { firstName, lastName, email, profilePicture } = useSelector((state: RootState) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newEmail, setNewEmail] = useState(email);
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

    if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets.length > 0) {
      const uri = pickerResult.assets[0].uri;
      console.log("Picked Image URI: ", uri); // Debug log
      dispatch(updateProfilePicture(uri));
    } else {
      console.log("Image Picker cancelled or no assets found");
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };
  const handleSaveChanges = () => {
    dispatch(updateUserDetails({newFirstName, newLastName, newEmail}));
    setEditMode(false);
  };
  

  return (
<SafeAreaView style={styles.container} >
<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
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
      <View style={styles.personal}>{!editMode? (
        <>
         <View style={styles.infoHeader}>
          <Text style={styles.infoHeader}>Personal Information</Text>
          <Text style={styles.edit} onPress={handleEditToggle}>Edit</Text>
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
        </>
      ) : 
      <>
          <View style={styles.infoHeader}>
          <Text style={styles.infoHeader}>Personal Information</Text>
          <Text style={styles.edit} onPress={handleEditToggle}>Cancel</Text>
        </View>
        <View style={[styles.info, styles.name]}>
          <View style={styles.icon}>
            <Ionicons name="person-outline" size={18} color="black" />
          </View>
          <TextInput
            value={newFirstName}
            onChangeText={setNewFirstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.textInputStyle}
            value={newLastName}
            onChangeText={setNewLastName}
            placeholder="Last Name"
          />
          </View>
        <View style={styles.info}>
          <View style={styles.icon}>
            <Ionicons name="mail-outline" size={18} color="black" />
          </View>
          <TextInput
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Email"
          />
          <Text style={[styles.edit, styles.save]} onPress={handleSaveChanges}>Save</Text>
        </View>
        </>}
       
      </View>
      </KeyboardAvoidingView>

      </SafeAreaView>
    
  );
};

export default userProfile;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
    flex: 1,
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
  save:{
    position: "absolute",
    right: 0,
  },
  textInputStyle: {
    paddingLeft: 30,
  }

});
