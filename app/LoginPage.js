import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/formInput";

import {
  Alert,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";

export default function LoginPage() {
  const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data) => {
    router.push('/HomePage')
  };

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={60}
      >
        <Text style={styles.header}>Enter your details</Text>

        <Text style={styles.text}>First Name</Text>
        <FormInput
          control={control}
          name={"firstName"}
          placeholder="First Name"
        />

        <Text style={styles.text}>Last Name</Text>
        <FormInput
          control={control}
          name={"lastName"}
          placeholder="Last Name"
        />
        <Text style={styles.text}>Enter Email</Text>
        <FormInput control={control} name={"email"} placeholder="Email" />
        <Text style={styles.text}>Password</Text>
        <FormInput
          control={control}
          name={"password"}
          placeholder="password"
          secureTextEntry
        />

        <View style={styles.spacer}></View>

        <TouchableOpacity
          style={[styles.submitBtn]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitBtnText}>Login</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: Dimensions.get("window").width >= 393 ? 40 : 30,
    fontFamily: "NexaRegular",
    margin: 25,
    textAlign: "center",
  },
  text: {
    marginLeft: 10,
    fontFamily: "NexaRegular",
  },
  input: {
    height: 40,
    margin: 8,
    padding: 10,
    backgroundColor: "#F4F7F8",
    borderRadius: 5,
  },
  submitBtn: {
    backgroundColor: "#00388E",
    paddingVertical: 10,
    paddingHorizontal: 150,
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
  spacer: {
    flex: 1,
  },
  disabled: {
    backgroundColor: "#A0A0A0",
  },
  invalidInput: {
    borderColor: "red",
    borderWidth: 1,
  },
});
