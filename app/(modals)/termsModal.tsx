import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const TermsModal = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Terms and Conditions</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt arcu vel arcu fermentum, eget facilisis ligula posuere. Fusce at felis et turpis egestas facilisis. Vivamus vehicula commodo libero, ac interdum purus blandit quis. Donec tincidunt enim vitae libero malesuada, at dictum mi scelerisque. Integer eu erat efficitur, lobortis purus a, fermentum arcu. Nullam vehicula augue id ultricies aliquet. Morbi quis velit magna. Phasellus vel lacinia velit.
        </Text>
        <Text style={styles.text}>
          Donec vehicula ullamcorper magna, at pharetra nulla vestibulum ac. Praesent sed elit nec urna tincidunt feugiat. Integer efficitur sem eu dui vestibulum, vel convallis libero sodales. Quisque eget eros urna. Nullam fermentum turpis nec aliquet volutpat. Etiam facilisis odio eget libero volutpat sodales. Integer vel dolor nec dui eleifend consectetur. Aliquam erat volutpat. Quisque scelerisque arcu nec mauris accumsan, id gravida lorem vestibulum.
        </Text>
        <Text style={styles.text}>
          Sed ultricies felis ac ligula blandit scelerisque. Nulla facilisi. Ut bibendum laoreet dictum. Nam ac justo non nisl vehicula scelerisque. Donec vitae mi et risus euismod sollicitudin. In hac habitasse platea dictumst. Nullam sit amet magna eget quam facilisis aliquet. Sed quis risus eget lorem sodales facilisis nec vel nisl.
        </Text>
        <Text style={styles.text}>
          Integer auctor neque eu nisl efficitur, at condimentum tortor tempor. Nullam bibendum elit eu nisl ullamcorper, nec vestibulum nunc egestas. Curabitur tempus odio ut magna dignissim, vel fringilla orci scelerisque. Suspendisse potenti. Proin eget lacinia ligula. Aenean tempor consequat magna, at fermentum nisl vestibulum at. Vivamus luctus est vel sapien fringilla, a scelerisque dui bibendum.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TermsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#00388E',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
