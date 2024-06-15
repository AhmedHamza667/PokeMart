import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomCheckbox = ({ isChecked, onChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
          {isChecked && <Ionicons name="checkmark" size={13} color="white" />}
        </View>
        <Text style={styles.label}>
          I Agree to the
          <Text onPress={toggleModal} style={styles.link}> Terms & Conditions</Text>
        </Text>
      </TouchableOpacity>
<SafeAreaView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="left"
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Terms and Conditions</Text>
          <ScrollView>
            <Text style={styles.modalText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt arcu vel arcu fermentum, eget facilisis ligula posuere. Fusce at felis et turpis egestas facilisis. Vivamus vehicula commodo libero, ac interdum purus blandit quis. Donec tincidunt enim vitae libero malesuada, at dictum mi scelerisque. Integer eu erat efficitur, lobortis purus a, fermentum arcu. Nullam vehicula augue id ultricies aliquet. Morbi quis velit magna. Phasellus vel lacinia velit.
            </Text>
            <Text style={styles.modalText}>
              Donec vehicula ullamcorper magna, at pharetra nulla vestibulum ac. Praesent sed elit nec urna tincidunt feugiat. Integer efficitur sem eu dui vestibulum, vel convallis libero sodales. Quisque eget eros urna. Nullam fermentum turpis nec aliquet volutpat. Etiam facilisis odio eget libero volutpat sodales. Integer vel dolor nec dui eleifend consectetur. Aliquam erat volutpat. Quisque scelerisque arcu nec mauris accumsan, id gravida lorem vestibulum.
            </Text>
            <Text style={styles.modalText}>
              Sed ultricies felis ac ligula blandit scelerisque. Nulla facilisi. 
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
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
  modal: {
    margin: 0, // Fullscreen modal
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20, 
    height: '100%', // Take full height of the screen
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 25
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: "#00388E",
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomCheckbox;
