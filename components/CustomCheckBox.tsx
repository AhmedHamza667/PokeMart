import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const CustomCheckbox = ({ isChecked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
        {isChecked && <Ionicons name="checkmark" size={13} color="white" />}
      </View>
      <Text style={styles.label}>
        I Agree to the
        <Link href="/termsModal">
          <Text style={styles.link}> Terms & Conditions</Text>
        </Link>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#00388E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: "#1D3557",
  },
  label: {
    fontSize: 14,
    color: "#4A5D79",
    fontFamily: "NexaRegular",
  },
  link: {
    textDecorationLine: "underline",
    color: "#4A5D79",
    fontFamily: "NexaBold",
  },
});

export default CustomCheckbox;
