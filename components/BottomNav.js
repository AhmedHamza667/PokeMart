import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ButtonNav() {
  const [activeTab, setActiveTab] = useState('home')
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
        style={[styles.button, activeTab === 'home' && styles.activeTab]}
        onPress={()=> setActiveTab('home')}>
            <View style={styles.left}>
                <Ionicons name={activeTab === 'home' ? 'home' : 'home-outline'} size={24} color="black" />
                <Text style={styles.buttonText}>
                    Home
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
        style={[styles.button, activeTab === 'cart' && styles.activeTab]}
        onPress={()=> setActiveTab('cart')}>
             <View style={styles.left}>
                <Ionicons name={activeTab === 'cart' ? 'cart' : 'cart-outline'} size={24} color="black" />
                <Text style={styles.buttonText}>
                    Cart
                </Text>
            </View>
        </TouchableOpacity>
        

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: '63px',
    marginHorizontal: 20,
    height: 60,
    width: 341,
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 10,
    color: '#021D49',
    fontFamily: 'NexaRegular',

  },
  activeTab:{
    backgroundColor: '#1170FF2E',
    borderRadius: 24,
    width: 178,
    height: 40,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
