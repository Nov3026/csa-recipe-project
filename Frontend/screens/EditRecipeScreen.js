import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { URL } from './constants';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditRecipeScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  // const [categories, setCategories] = useState([]);
  const [recipeData, setRecipeData] = useState({
    recipename: "",
    recipedescription: "", 
    recipeingredient: "",
    recipeinstruction: "",
    cookingtime: "",
    level: null,
    // category_id: null,
    image: null
  });

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(`${URL}/recipe/${recipeId}`);
        const { recipe } = response.data;
        setRecipeData({
          recipename: recipe.recipename,
          recipedescription: recipe.recipedescription,
          recipeingredient: recipe.recipeingredient,
          recipeinstruction: recipe.recipeinstruction,
          cookingtime: recipe.cookingtime,
          level: recipe.level,
          // category_id: recipe.category_id,
          image: recipe.image
        });
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };
    fetchRecipeData();
  }, [recipeId]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(`${URL}/all-category`);
  //       const responseData = response.data;
        
  //       if (Array.isArray(responseData.categories)) {
  //         setCategories(responseData.categories);
  //       } else {
  //         console.error('Invalid categories data:', responseData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handleInputChange = (key, value) => {
    setRecipeData({ ...recipeData, [key]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setRecipeData({ ...recipeData, image: imageUri });
    }
  };
  
  
  

  const handleUpdateRecipe = async () => {
    try {
      // Retrieve the user ID from AsyncStorage
      const userId = await AsyncStorage.getItem('UserId');
  
      // Send PUT request with updated recipe data and user_id
      const response = await axios.put(`${URL}/update-recipe/${recipeId}`, {
        ...recipeData,
        user_id: userId, // Include user_id in the request payload
      });
  
      console.log('Response:', response.data);
      Alert.alert('Success', 'Recipe updated successfully', [
        { text: 'Okay', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error updating recipe:', error);
      Alert.alert('Error', 'An error occurred while updating the recipe. Please try again later.');
    }
  };
  
  return (
    <View style={styles.container}>
    <ScrollView style={{
        marginTop: 35,
      }}
        showsVerticalScrollIndicator={false}
      >
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipe Name:</Text>
        <TextInput
          style={styles.input}
          value={recipeData.recipename}
          onChangeText={(val) => handleInputChange('recipename', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipe Description:</Text>
        <TextInput
          style={styles.input}
          value={recipeData.recipedescription}
          onChangeText={(val) => handleInputChange('recipedescription', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipe Ingredient:</Text>
        <TextInput
          style={styles.input}
          value={recipeData.recipeingredient}
          onChangeText={(val) => handleInputChange('recipeingredient', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipe Instruction:</Text>
        <TextInput
          style={styles.input}
          value={recipeData.recipeinstruction}
          onChangeText={(val) => handleInputChange('recipeinstruction', val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cooking Time:</Text>
        <TextInput
          style={styles.input}
          value={recipeData.cookingtime}
          onChangeText={(val) => handleInputChange('cookingtime', val)}
        />
      </View>
      <View style={styles.radioGroup}>
        <Text>Level:</Text>
        <Picker
          selectedValue={recipeData.level}
          onValueChange={(val) => handleInputChange('level', val)}
        >
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Easy" value="Easy" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        {/* <Text style={styles.label}>Category:</Text>
        <Picker
          style={styles.input}
          selectedValue={recipeData.category_id}
          onValueChange={(val) => handleInputChange('category_id', val)}
        >
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker> */}
      </View>
      <View style={styles.imageContainer}>
        {recipeData.image && <Image source={{ uri: recipeData.image }} style={styles.image} />}
        <Button title="Pick Image" onPress={pickImage} />
      </View>
      <View>
      <TouchableOpacity style={styles.addButton}
        onPress={() => handleUpdateRecipe()}
      >
        <Text style={styles.buttonText}>Update Recipe</Text>
      </TouchableOpacity>
      </View>
      {/* <Button title="Update Recipe" onPress={handleUpdateRecipe} /> */}
    </ScrollView>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
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

export default EditRecipeScreen;
