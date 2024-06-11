// components/formInput.jsx
import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

const FormInput = ({ control, name, ...otherProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...otherProps}
          />
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </>
      )}
    />
  );
};
export default FormInput;
const styles = StyleSheet.create({
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
  errorMessage: {
    color: 'red',
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
