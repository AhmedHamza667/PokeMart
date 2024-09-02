import { Link } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/formInput";
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
  useColorScheme
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { login, updateUserDetails } from "../store/authReducer";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { authClient } from "../apollo";
import { useTheme } from "@shopify/restyle";
import { Theme } from '../theme';

export default function LogIn() {


const LOGIN_MUTATION = gql`
mutation Login($email: EmailPhone!, $password: Password!, $deviceId: String) {
  login(emailOrPhoneNumber: $email, password: $password, deviceId: $deviceId) {
    accessToken
  }
}
`;



  const dispatch = useDispatch()
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const formSchema = z.object({
    email: z.string().min(10, "email must be at least 10 characters"),
    password: z.string().min(4, "Password must be at least 4 characters"),
  });
  const { control, handleSubmit, formState, setFocus, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  const { isValid, errors } = formState;
  useEffect(() => {
    if (isLoggedIn) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      setTimeout(() => {
        router.push("/HomePage");
      }, 1000);
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password',
      });
    }
  }, [isLoggedIn]);

  const onSubmit = (data) => {
    const {email, password} = data;
    dispatch(login({email, password}))
  };


  const data = [
    {
      id: "1",
      height: 140,
      image:
        "https://images.unsplash.com/photo-1642534270237-ae57b321c5bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      height: 195,
      image:
        "https://images.unsplash.com/photo-1609372332255-611485350f25?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      height: 195,
      marginTop: -45,
      image:
        "https://images.unsplash.com/photo-1542887486-c0aeb6d2fc46?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      height: 140,
      image:
        "https://images.unsplash.com/photo-1715279239414-a47d59d0dc41?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const theme = useTheme<Theme>();

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.imageContainer,
        { height: item.height, marginTop: item.marginTop },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea, {backgroundColor: theme.colors.background}]}>
      <KeyboardAvoidingView behavior="position" style={styles.in}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
         <View>
          <Text style={[styles.header, { color: theme.colors.text }]}>PokeMarket</Text>
          <Text style={[styles.intro, { color: theme.colors.text }]}>
          Catch ’Em All, Shop ’Em All at PokeMarket!
          </Text>
        </View>
        
        <View style={styles.form}>
          <Text style={{ color: theme.colors.text }}>Enter Email</Text>
          <FormInput
            control={control}
            name={"email"}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => setFocus("password")}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Text style={{ color: theme.colors.text }}>Password</Text>
          <FormInput
            control={control}
            name={"password"}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
            keyboardType="default"
            onSubmitEditing={handleSubmit(onSubmit)} 

          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          {/* <View style={styles.spacer}></View> */}
          <TouchableOpacity
            style={[styles.submitBtn, !isValid ? styles.disabled : null]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitBtnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/SignUp")}
            style={styles.createBtn}
          >
            <Text style={styles.createBtnTxt}>Create account</Text>
          </TouchableOpacity>
        </View>
        <StatusBar barStyle="dark-content" />
        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  in: {
    marginHorizontal: 10,
  },
  header: {
    fontSize: 32,
    fontFamily: "Nexa-Bold",
    marginBottom: 10,
  },
  intro: {
    fontFamily: "Nexa-Regular",
    fontSize: 14,
    paddingBottom: 10,
  },
  submitBtn: {
    backgroundColor: "#00388E",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Nexa-Bold",
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  createBtn: {
    alignSelf: "center",
    paddingVertical: 10,
  },
  createBtnTxt: {
    color: "#00388E",
    fontSize: 15,
    fontFamily: "Nexa-Bold",
  },
  grid: {
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  imageContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 6,
    overflow: "hidden",
  },
  form: {
    paddingTop: 50,
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }

});
