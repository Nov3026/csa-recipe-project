import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { URL } from './constants'; // assuming you have defined URL in a separate file

const UpdatePasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put(`${URL}/update-password`, {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to update password');
      }

      Alert.alert('Password updated successfully', 'Please login');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('SignIn'); // Navigate to the sign-in screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.updatePasswordText}>Update Your Password</Text>
      <View style={styles.form}>
      
        <TextInput
          style={styles.input}
          placeholderTextColor='#fff'
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
    
        <TextInput
          style={styles.input}
          placeholderTextColor='#fff'
          placeholder="Enter your new password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      
        <TextInput
          style={styles.input}
          placeholderTextColor='#fff'
          placeholder="Confirm your new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {/* <Button title="Update Password" onPress={handleUpdatePassword} /> */}
        <TouchableOpacity style={styles.addButton} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f96163',
    paddingHorizontal: 35,
  },
  updatePasswordText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
      alignSelf: "center"
  },
  form: {
      justifyContent: "space-between",
      alignContent: "center"
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white', // Input border color
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 10,
    color: '#fff'
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 13,  // All sides are 10
    marginTop: 30,
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
    buttonText: {
    color: '#f96163',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdatePasswordScreen;
