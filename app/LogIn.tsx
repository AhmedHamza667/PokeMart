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
  StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { login, updateUserDetails } from "../store/authReducer";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { authClient } from "../apollo";
export default function LogIn() {


const LOGIN_MUTATION = gql`
mutation Login($email: EmailPhone!, $password: Password!, $deviceId: String) {
  login(emailOrPhoneNumber: $email, password: $password, deviceId: $deviceId) {
    accessToken
  }
}
`;

const [login, { data: loginData, loading, error }] = useMutation(LOGIN_MUTATION,{
  client: authClient});



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
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Login Successful',
  //     });
  //     setTimeout(() => {
  //       router.push("/HomePage");
  //     }, 1000);
  //   }
  //   else {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Invalid email or password',
  //     });
  //   }
  // }, [isLoggedIn]);

  // const onSubmit = (data) => {
  //   const {email, password} = data;
  //   dispatch(login({email, password}))
  // };

  const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      address
      countryCode
      firstName
      isActive
      isVerified
      lastName
    }
  }
`;

  const onSubmit = async (data) => {
    const {email, password} = data;
    try {
      const response = await login({
        variables: {
          email,
          password,
          deviceId: '33B84027-FD24-493E-9120-2D3843A0CE9A'
        },
      });
      const token = response.data.login.accessToken
      console.log(token); // Handle successful login response
      await SecureStore.setItemAsync("token", token);
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      setTimeout(async () => {
        const { data: userData } = await authClient.query({
          query: GET_CURRENT_USER,
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });
        dispatch(updateUserDetails(userData.getCurrentUser));
        router.push("/HomePage");
      }, 1000);

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password',
      });
      console.error('Login error:', error);
    }
  };
  const data = [
    {
      id: "1",
      height: 140,
      image:
        "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      height: 195,
      image:
        "https://images.unsplash.com/photo-1657249771314-b9869bb0e321?q=80&w=2846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      height: 195,
      marginTop: -45,
      image:
        "https://images.unsplash.com/photo-1614897464244-86c6b2fdda79?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      height: 140,
      image:
        "https://images.unsplash.com/photo-1702310636300-5b8103970683?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
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
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <KeyboardAvoidingView behavior="position">
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
        <View>
        <Text style={styles.header}>Fashion Tap</Text>
        <Text style={styles.intro}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          temporibus autem incidunt, sequi
        </Text>
        </View>
        
        <View style={styles.form}>
          <Text>Enter Email</Text>
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

          <Text>Password</Text>
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
    alignItems: "center",
    
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
