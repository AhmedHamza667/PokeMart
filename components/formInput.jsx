// components/formInput.jsx
import {React} from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";

const FormInput = ({ control, name, containerStyle, ...otherProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            ref={ref}
            {...otherProps}
          />
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
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#F4F7F8",
    borderRadius: 5,
  },
});
