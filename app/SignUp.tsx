import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/formInput";
import { Ionicons } from "@expo/vector-icons";
import CustomCheckbox from "../components/CustomCheckBox";
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from "../store/authReducer";
import Toast from 'react-native-toast-message';
import { Theme } from '../theme';


import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@shopify/restyle";

export default function SignUp() {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const formSchema = z
    .object({
      email: z.string().email("Please enter a valid email"),
      firstName: z.string().min(3, "First name must be at least 3 characters"),
      lastName: z.string().min(3, "Last name must be at least 3 characters"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  const { control, handleSubmit, formState, setFocus, register } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });
  const { isValid, errors } = formState;



  const onSubmit = (data) => {
      const {firstName, lastName, email, password} = data;
      if (!isChecked) {
        Alert.alert("Please agree to the Terms & Conditions");
        return;
      }
      dispatch(signUp({firstName, lastName, email, password}));
      Toast.show({
        type: 'success',
        text1: 'User Created',
      });
        setTimeout(() => {
          router.push("/LogIn");
        }, 1000);

  };
  const router = useRouter();
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
        <Text style={[styles.header, {color: theme.colors.text}]}>Enter your details</Text>
        <View style={styles.form}>
          <Text style={[styles.text, {color: theme.colors.text}]}>First Name</Text>
          <FormInput
            control={control}
            name={"firstName"}
            placeholder="First Name"
            returnKeyType="next"
            onSubmitEditing={() => setFocus("lastName")}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName.message}</Text>
          )}

          <Text style={[styles.text, {color: theme.colors.text}]}>Last Name</Text>
          <FormInput
            control={control}
            name={"lastName"}
            placeholder="Last Name"
            returnKeyType="next"
            onSubmitEditing={() => setFocus("email")}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName.message}</Text>
          )}

          <Text style={[styles.text, {color: theme.colors.text}]}>Enter Email</Text>
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

          <Text style={[styles.text, {color: theme.colors.text}]}>Password</Text>
          <View style={styles.inputContainer}>
            <FormInput
              control={control}
              name={"password"}
              placeholder="Password"
              secureTextEntry={!showPassword}
              returnKeyType="next"
              keyboardType="default"
              style={styles.input}
              onSubmitEditing={() => setFocus("confirmPassword")}
            />
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
              onPress={() => setShowPassword(!showPassword)}
              style={styles.icon}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Text style={[styles.text, {color: theme.colors.text}]}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <FormInput
              control={control}
              name={"confirmPassword"}
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
              returnKeyType="done"
              keyboardType="default"
              style={styles.input}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
              onPress={() => setShowPassword(!showPassword)}
              style={styles.icon}
            />
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
        <View style={styles.footer}>
          <CustomCheckbox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <TouchableOpacity
            style={[styles.submitBtn, !isValid ? styles.disabled : null]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
        <Toast />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  form: {
    marginHorizontal: 8,
  },
  header: {
    fontSize: Dimensions.get("window").width >= 393 ? 40 : 30,
    fontFamily: "Nexa-Regular",
    margin: 25,
    textAlign: "center",
  },
  text: {
    marginLeft: 10,
    fontFamily: "Nexa-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7F8",
    borderRadius: 5,
    height: 40,
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  submitBtn: {
    backgroundColor: "#00388E",
    width: 341,
    height: 46,
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Nexa-Bold",
    textAlign: "center",
  },
  spacer: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "column",
    margin: 0,
    padding: 0,
    alignContent: "flex-end",
    alignItems: "center",
  }
});
