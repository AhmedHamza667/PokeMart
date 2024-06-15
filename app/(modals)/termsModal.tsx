// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Modal from 'react-native-modal';

// const TermsModal = () => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleModal}>
//         <Text style={styles.openButton}>Show Terms and Conditions</Text>
//       </TouchableOpacity>

//       <Modal
//         isVisible={isModalVisible}
//         onBackdropPress={toggleModal}
//         onSwipeComplete={toggleModal}
//         swipeDirection="left"
//         animationIn="slideInLeft"
//         animationOut="slideOutLeft"
//         style={styles.modal}
//       >
//         <View style={styles.modalContent}>
//           <Text style={styles.header}>Terms and Conditions</Text>
//           <Text style={styles.text}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt arcu vel arcu fermentum, eget facilisis ligula posuere. Fusce at felis et turpis egestas facilisis. Vivamus vehicula commodo libero, ac interdum purus blandit quis. Donec tincidunt enim vitae libero malesuada, at dictum mi scelerisque. Integer eu erat efficitur, lobortis purus a, fermentum arcu. Nullam vehicula augue id ultricies aliquet. Morbi quis velit magna. Phasellus vel lacinia velit.
//           </Text>
//           <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default TermsModal;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   openButton: {
//     fontSize: 18,
//     color: '#00388E',
//   },
//   modal: {
//     margin: 0, // Fullscreen modal
//     justifyContent: 'flex-start',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     height: '100%', // Take full height of the screen
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 15,
//     lineHeight: 24,
//   },
//   closeButton: {
//     backgroundColor: '#00388E',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
  
// });
