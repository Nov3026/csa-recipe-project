import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text,Button, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { URL } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

const AddRecipeScreen = () => {
  //const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    recipename: "",
    recipedescription: "",
    recipeingredient: "",
    recipeinstruction: "",
    cookingtime: "",
    level: null,
    image: null
  });
  const [image, setImage] = useState(null);

  
  

  const handleInputChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateRecipe = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Corrected key to 'userId'
      if (!data.recipename || !data.recipedescription || !data.recipeingredient || !data.recipeinstruction || !data.cookingtime || !data.level || !image || !userId) {
        Alert.alert('Missing field', 'Please fill in all fields');
        return;
      }

      const response = await axios.post(`${URL}/create-recipe`, {
        recipename: data.recipename,
        recipedescription: data.recipedescription,
        recipeingredient: data.recipeingredient,
        recipeinstruction: data.recipeinstruction,
        cookingtime: data.cookingtime,
        level: data.level,
        image: image,
        user_id: userId // Include the user ID here
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Response:', response.data);
      Alert.alert('Success', 'Recipe created successfully', [
        { text: 'Okay', onPress: () => resetForm() }
      ]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while creating the recipe. Please try again later.');
    }
  };

  const resetForm = () => {
    setData({
      recipename: '',
      recipedescription: '',
      recipeingredient: '',
      recipeinstruction: '',
      cookingtime: '',
      level: '',
      image: null,
      user_id: ''
    });
    setImage(null);
  };

  return (
    <ScrollView style={styles.container} ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 40 }}>
        <TextInput
          style={styles.input}
          placeholder="Recipe Name"
          value={data.recipename}
          onChangeText={(val) => setData({...data, recipename: val})}
        />

        <TextInput
          style={{ ...styles.input, height: 80, }}
          placeholder="Recipe Description"
          multiline
          numberOfLines={4}
          value={data.recipedescription}
          onChangeText={(val) => setData({...data, recipedescription: val})}
        />

        <TextInput
          style={{ ...styles.input, height: 80, }}
          placeholder="Recipe Ingredient"
          multiline
          numberOfLines={4}
          value={data.recipeingredient}
          onChangeText={(val) => setData({...data, recipeingredient: val})}
        />

        <TextInput
          style={{ ...styles.input, height: 80, }}
          placeholder="Recipe Instruction"
          multiline
          numberOfLines={4}
          value={data.recipeinstruction}
          onChangeText={(val) => setData({...data, recipeinstruction: val})}
        />

        <TextInput
          style={{ ...styles.input, height: 80, }}
          placeholder="Cooking Time"
          multiline
          numberOfLines={4}
          value={data.cookingtime}
          onChangeText={(val) => setData({...data, cookingtime: val})}
        />

        <View style={styles.radioGroup}>
          <Text>Level:</Text>
          <RadioButton.Group 
            onValueChange={(val) => setData({ ...data, level: val })} 
            value={data.level}
          >
            <View style={styles.radioItem}>
              <RadioButton value="None"/>
              <Text>None</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="Easy"/>
              <Text>Easy</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="Medium"/>
              <Text>Medium</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="High"/>
              <Text>High</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.imageIcon}>             
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => handleCreateRecipe()}>
          <Text style={styles.buttonText}>Create Recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingLeft: 35,
    paddingRight: 35,
    textAlign: 'center',
    paddingTopTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#eee',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    gap: 25,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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
  button: {
    borderRadius: 10, // Set the border radius
    borderWidth: 2, // Set the border width
    borderColor: '#3498db', // Set the border color to blue
    padding: 10, // Add some padding for better visual appearance
  },
  dropdownContainer: {
    marginBottom: 20,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  dropdownLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: '#000',
  },
  imageIcon: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddRecipeScreen;
