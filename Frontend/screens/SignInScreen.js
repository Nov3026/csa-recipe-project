import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';
import React, { useState } from 'react';
import { URL } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({navigation}) {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        // Validate input
        if (!data.email || !data.password) {
            Alert.alert('Missing field', 'Email and Password are required');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${URL}/login`, {
                email: data.email,
                password: data.password
            });

            const { access_token, refresh_token, id, firstname, lastname } = response.data;

            // Save the tokens and user ID to AsyncStorage for future requests
            await AsyncStorage.setItem('accessToken', access_token);
            await AsyncStorage.setItem('refreshToken', refresh_token);
            await AsyncStorage.setItem('UserId', String(id));
            await AsyncStorage.setItem('firstname', firstname);
            await AsyncStorage.setItem('lastname', lastname);

            // Fetch user details using the user ID
            const userResponse = await axios.get(`${URL}/user-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const userData = userResponse.data;

            // Save user details to AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));

            // Navigate to the authenticated
            navigation.navigate('Welcome');
        } catch (error) {
            console.log('Login error:', error);

            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'Invalid credentials. Please try again.');
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.signInText}>Sign In</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor='#fff'
                    value={data.email}
                    onChangeText={(val) => setData({ ...data, email: val })}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor='#fff'
                    value={data.password}
                    onChangeText={(val) => setData({ ...data, password: val })}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleSignIn}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.option}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.optionText}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('UpdatePasword')}
                >
                    <Text style={styles.optionText}>Forget Password?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f96163',
        paddingHorizontal: 35,
    },
    signInText: {
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
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 10,
        color: '#eee'
    },
    option: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    optionText: {
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#fff',
        padding: 13,
        marginTop: 30,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    buttonText: {
        color: '#f96163',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
