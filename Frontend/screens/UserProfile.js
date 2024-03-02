import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { URL } from './constants';
import { useFocusEffect } from '@react-navigation/native';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const fetchUserData = async () => {
    try {
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
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.imageBox}>
            <Image
              source={require('../assets/user.jpg')} // Replace with the path to your image
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={styles.label}>
              {user.firstname} {user.lastname}
            </Text>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      <View style={styles.profileOption}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('EditUserProfileStack', { userId: user.id })}
        >
          <AntDesign name="user" size={24} color="black" />
          <Text style={styles.optionLabel}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
              style={styles.option}
          onPress={() => navigation.navigate('SignIn')}
          >
              <MaterialIcons name="logout" size={24} color="black" />
              <Text style={styles.optionLabel}>Logout</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageBox: {
    backgroundColor: '#f96163',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: '45%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  profileOption: {
    // width: '80%',
    // justifyContent: "center",

    // padding: 30,
    paddingTop: 50,
    paddingHorizontal: 30,
    gap: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#eee',
    padding: 15,
    // marginTop: 20,
    gap: 15,
  },
});

export default UserProfileScreen;
