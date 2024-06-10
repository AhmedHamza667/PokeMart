import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    if (firstname && lastname && isValidEmail && isValidPassword) {
      setIsDisabled(false);
    }
    else {
      setIsDisabled(true);
    }

  }, [firstname, lastname, isValidEmail, isValidPassword]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };
  const validatePassword = (password) => {
    setIsValidPassword(password.length >= 8);
  };

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={60}>
            <Text style={styles.header}>Enter your details</Text>

            <Text style={styles.text}>First Name</Text>
            <TextInput style={styles.input} 
            onChangeText={setFirstname}/>
            <Text style={styles.text}>Last Name</Text>
            <TextInput style={styles.input} 
            onChangeText={setLastname}/>
            <Text style={styles.text}>Enter Email</Text>
            <TextInput style={[styles.input, !isValidEmail && email ? styles.invalidInput : null ]} 
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            keyboardType='email-address'/>
            <Text style={styles.text}>Password</Text>
            <TextInput style={[styles.input, !isValidPassword && password ? styles.invalidInput : null ]} secureTextEntry={true} 
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text);
            }}/>
            
            <View style={styles.spacer}>
            </View>
           
          <TouchableOpacity style={[styles.submitBtn, isDisabled && styles.disabled]}
          onPress={() => router.push('/HomePage')} 
          disabled={isDisabled}>  
              <Text style={styles.submitBtnText}>Login</Text>
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
    fontSize: Dimensions.get('window').width >= 393 ? 40 : 30,
    fontFamily: 'NexaRegular',
    margin: 25,
    textAlign: 'center',
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
  },
  disabled:{
    backgroundColor: '#A0A0A0'
  },
  invalidInput: {
    borderColor: 'red',
    borderWidth: 1,
  }
});
