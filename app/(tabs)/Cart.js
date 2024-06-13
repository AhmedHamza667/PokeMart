import { StatusBar } from 'expo-status-bar';
import { Image, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottonNav from '../../components/BottomNav'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cart() {
    const [cart, setCart] = useState([
        { id: '1', name: 'Teddy Bear', quantity: 1, price: '$12', image: 'https://images.unsplash.com/photo-1562040506-a9b32cb51b94?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '2', name: 'Batman Car', quantity: 1, price: '$20', image: 'https://images.unsplash.com/photo-1657249771314-b9869bb0e321?q=80&w=2846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        // { id: '3', name: 'Toy Story Toy', price: '$12', image: 'https://images.unsplash.com/photo-1614897464244-86c6b2fdda79?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ]);
    // render function
 
    function handleAdd(item) {
      const newCart = cart.map(cartItem => {
          if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
      });
      setCart(newCart);
  }
  function handleReduce(item) {
    const newCart = cart.map(cartItem => {
        if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
    });
    setCart(newCart);
}
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.quantitySelector}>
                <TouchableOpacity onPress={()=> {handleReduce(item)}}>
                <Ionicons name="remove-circle" size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.quantityInput}> 0{item.quantity}</Text>
                <TouchableOpacity onPress={()=> {handleAdd(item)}}>
                <Ionicons name="add-circle-sharp" size={24} color="black" />
                </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Text>Delivery by <Text style={styles.bold}>March 12, 2024</Text></Text>
          </View>
        </View>
      );

  return (
    <>
    
   
        <FlatList 
                 style={{paddingTop: 20}}
                 data={cart}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                 contentContainerStyle={styles.list}
        />
        <View style={styles.footer}>
            <Text style={styles.total}>Total <Text style={styles.bold}>$32</Text></Text>
            <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
        
        {/* <BottonNav /> */}
       
        <StatusBar style="light" />
</>
  );
}

const styles = StyleSheet.create({
    outter: {
        backgroundColor: 'black',
    },

  container: {
    flex: 1,
    backgroundColor: '#fff',  
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    margin: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  itemImage: {
    width: 114,
    height: 102,
    resizeMode: 'cover',
    borderRadius: 10
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'NexaRegular'
  
  },
  itemPrice: {
    fontSize: 14,
    color: '#05A20C',
    fontWeight: 'bold',
    fontFamily: 'NexaBold',
    paddingVertical: 7,

   
  },
  imageContainer: {
    position: 'relative',
  },
  textContainer:{
    flex: 1,
    marginLeft: 10
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: 10,
    left: 10,
    borderRadius: 15,
    width: 94,
    height: 32,
  },
  quantityInput: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'NexaRegular',

  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,    
  },
  orderButton: {
    backgroundColor: '#00388E',
    width: 148,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
  },
  orderButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'NexaRegular',

  },
  total: {
    fontSize: 15,
    fontWeight: 'normal',

  },
  bold: {
    fontWeight: 'bold',
  }
  
});
