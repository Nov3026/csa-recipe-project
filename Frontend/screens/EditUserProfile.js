import React, { useState, useEffect, useCallback } from 'react';
import { View,TouchableOpacity, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from './constants';

const EditUserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    gender: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('UserId');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${URL}/user-details/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSaveProfile = useCallback(async () => {
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem('accessToken');
      await axios.put(`${URL}/edit-profile`, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Alert.alert('Success', 'User profile updated successfully!');
      navigation.goBack(); // Navigate back to UserProfileScreen
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update user profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={user.firstname}
        onChangeText={(text) => setUser({ ...user, firstname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={user.lastname}
        onChangeText={(text) => setUser({ ...user, lastname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={user.gender}
        onChangeText={(text) => setUser({ ...user, gender: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={user.phone}
        onChangeText={(text) => setUser({ ...user, phone: text })}
      />
      {/* <Button title="Save Profile" onPress={handleSaveProfile} /> */}
      <TouchableOpacity style={styles.addButton}
        onPress={() => handleSaveProfile()}
      >
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#eee',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    gap: 25,
},
  form: {
    justifyContent: "center",
    alignContent: "center",
    marginTop: 100,
    
},

addButton: {
  backgroundColor: '#f96163',
  padding: 13,  // All sides are 10
  paddingHorizontal: 20,  // Left and right are 20
  borderRadius: 15,
  marginTop: 20,
  width: '100%',
  alignSelf: 'center'
},
buttonText: {
  color: 'white',
  textAlign: 'center',
},
});

export default EditUserProfileScreen;
