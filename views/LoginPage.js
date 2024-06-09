import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text style={styles.header}>Enter your details</Text>

            <Text style={styles.text}>First Name</Text>
            <TextInput style={styles.input} />
            <Text style={styles.text}>Last Name</Text>
            <TextInput style={styles.input} />
            <Text style={styles.text}>Enter Email</Text>
            <TextInput style={styles.input} />
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} />
            
            <View style={styles.spacer}>
            </View>

            <TouchableOpacity style={styles.submitBtn}>
              <Link href="/HomePage">
                  <Text style={styles.submitBtnText}>Login</Text>
              </Link>
            </TouchableOpacity>
           

            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  header: {
    fontSize: '40px',
    fontFamily: 'NexaRegular',
    margin: 25,
  },
  text: {
    marginLeft: 10,
    fontFamily: 'NexaRegular',

  },
  input: {
    height: 40,
    margin: 8,
    padding: 10,
    backgroundColor: '#F4F7F8',
    borderRadius: 5,
  },
  submitBtn : {
    backgroundColor: '#00388E',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,

  },
  submitBtnText : {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NexaBold',

  },
  spacer: {
    flex: 1,
  }
});
