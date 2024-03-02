import React, { useState } from 'react';
import { StyleSheet,  Pressable, Text, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './constants';
//import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        gender: "",
        phone: "",
        password: "",
        confirmPassword: "", // Corrected spelling
    });

    const handleSignUp = async () => { // Make the function asynchronous to use AsyncStorage
        try {
            // Validate Required Fields
            const requiredFields = ['firstName', 'lastName', 'userName', 'email', 'gender', 'phone', 'password', 'confirmPassword'];
            for (const field of requiredFields) {
                if (!data[field]) {
                    throw new Error(`Missing field: ${field}`);
                }
            }

            // Check for password match
            if (data.password !== data.confirmPassword) {
                throw new Error('Password and Confirm Password do not match');
            }

            // Make axios request to API
            const response = await axios.post(`${URL}/register`, {
                firstname: data.firstName,
                lastname: data.lastName,
                username: data.userName,
                email: data.email,
                gender: data.gender,
                phone: data.phone,
                password: data.password,
            });

            // Store user ID in AsyncStorage
            await AsyncStorage.setItem('userId', response.data.id.toString());

            // Alert Message
            Alert.alert(
                'Account Created Successfully',
                'Please Login In',
                [{ text: 'Okay', onPress: () => navigation.navigate('SignIn') }]
            );
        } catch (error) {
            Alert.alert(
                'Registration Error',
                error.message || 'An unexpected error occurred during registration',
                [{ text: 'Okay' }]
            );
        }
    };

    return (
       
      // <KeyboardAvoidingView behavior='padding'
        //     keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
        //     style={styles.container}
        // >
            // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ ...styles.container, paddingTop: 130, paddingHorizontal: 35 }}
                >
                    <Text style={styles.signInText}>Create your Account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor='#fff'
                        value={data.firstName}
                        onChangeText={(val) => setData({ ...data, firstName: val })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor='#fff'
                        value={data.lastName}
                        onChangeText={(val) => setData({ ...data, lastName: val })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor='#fff'
                        value={data.userName}
                        onChangeText={(val) => setData({ ...data, userName: val })}
                        autoCapitalize="none" // Ensure username is not auto-capitalized
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor='#fff'
                        value={data.email}
                        onChangeText={(val) => setData({ ...data, email: val })}
                        autoCapitalize="none" // Ensure email is not auto-capitalized
                        keyboardType="email-address" // Set keyboard type to email address for better user experience
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Gender"
                        placeholderTextColor='#fff'
                        value={data.gender}
                        onChangeText={(val) => setData({ ...data, gender: val })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        placeholderTextColor='#fff'
                        value={data.phone}
                        keyboardType="phone-pad" // Set to 'phone-pad' to show numeric keyboard with symbols for phone number input
                        onChangeText={(val) => setData({ ...data, phone: val })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor='#fff'
                        value={data.password}
                        secureTextEntry={true}  // Set to true to hide text content
                        onChangeText={(val) => setData({ ...data, password: val })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor='#fff'
                        value={data.confirmPassword}
                        secureTextEntry={true}  // Set to true to hide text content
                        onChangeText={(val) => setData({ ...data, confirmPassword: val })}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </ScrollView>
            // </TouchableWithoutFeedback>
        // {/* </KeyboardAvoidingView> */ }
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f96163', // Background color
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Text color
        marginBottom: 20,
        alignSelf: "center"
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
    // backArrow:{
    //     paddingHorizontal: 20,
    //     marginTop: 30
    //   }
});
