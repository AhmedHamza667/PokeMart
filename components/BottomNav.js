import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

export default function ButtonNav() {
  const currentRoute = usePathname();
  
  return (
    <>
      <View style={styles.container}>
          
        <TouchableOpacity 
        style={[styles.button, currentRoute === '/HomePage' && styles.activeTab]}>
            <View style={styles.left}>
                <Ionicons name={currentRoute === '/HomePage' ? 'home' : 'home-outline'} size={24} color="black" />
                <Text style={styles.buttonText}>
                    Home
                </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.button, currentRoute === '/Cart' && styles.activeTab]}>
             <View style={styles.left}>
                <Ionicons name={currentRoute === '/Cart' ? 'cart' : 'cart-outline'} size={24} color="black" />
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
    borderRadius: 63,
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
