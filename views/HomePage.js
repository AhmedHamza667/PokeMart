import BottonNav from '../components/BottomNav'
import { SafeAreaView, ScrollView, StyleSheet, 
    Text, TouchableOpacity, View, 
    FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function HomePage() {
    // mock data
    const data = [
        { id: '1', name: 'Teddy Bear', price: '$12', image: 'https://images.unsplash.com/photo-1562040506-a9b32cb51b94?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '2', name: 'Batman Car', price: '$20', image: 'https://images.unsplash.com/photo-1657249771314-b9869bb0e321?q=80&w=2846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '3', name: 'Toy Story Toy', price: '$12', image: 'https://images.unsplash.com/photo-1614897464244-86c6b2fdda79?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '4', name: 'Police car', price: '$12', image: 'https://images.unsplash.com/photo-1702310636300-5b8103970683?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '5', name: 'Bag', price: '$20', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '6', name: 'Wallet', price: '$10', image: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '7', name: 'Shoes', price: '$32', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '8', name: 'Mug', price: '$7', image: 'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];
    // render function
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      );
      
  return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.btn}>
                    <Ionicons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.header}>Home</Text>
                </View>
                <TouchableOpacity style={styles.img}>
                    <Ionicons name="person-circle-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.rest}>
                <Text style={styles.helloMsg}>Hello,</Text>
                <Text style={styles.userName}>Ahmed Hamza</Text>
                <FlatList 
                 numColumns={2}
                 data={data}
                 renderItem={renderItem}
                 keyExtractor={item => item.id}
                 contentContainerStyle={styles.list}
                />
            </View>
            <BottonNav />
            <StatusBar style="light" />
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  rest: {
    backgroundColor: 'white',
    flex: 1,  
    marginBottom: 20
},
  navBar: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center',
    
  },
  title: {
    flex: 1,
  },

  btn: {
    flex: 1,
    alignItems: 'flex-start'
  },
  img: {
    flex: 1,
    alignItems: 'flex-end',
  },
  helloMsg: {
    fontSize: 32,
    fontWeight: '300',
    paddingTop: 10,
    paddingHorizontal: 10

  },
  userName: {
    fontSize: 32,
    fontWeight: '700',
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 14,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{translateX: -90}],
    backgroundColor: '#28a745',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '55%'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
  },
  

});
