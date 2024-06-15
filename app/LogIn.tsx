import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/formInput";

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
export default function LogIn() {
  const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const { control, handleSubmit, formState, setFocus, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  const { isValid, errors } = formState;
  const onSubmit = (data) => {
    router.push("/HomePage");
  };
  const router = useRouter();
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
    <SafeAreaView style={styles.container}>
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
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    
    // marginRight: 8
  },
  header: {
    fontSize: 32,
    fontFamily: "NexaBold",
    marginBottom: 10,
  },
  intro: {
    fontFamily: "NexaRegular",
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
    fontFamily: "NexaBold",
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
    fontFamily: "NexaBold",
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
});
