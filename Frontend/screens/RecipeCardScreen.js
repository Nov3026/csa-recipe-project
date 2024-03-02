import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';

import { URL } from './constants';

const RecipeCardScreen = ({ refreshing, searchQuery }) => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe for edit/delete

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch the logged-in user ID from AsyncStorage
        let userId = await AsyncStorage.getItem('userId');

        if (!userId) {
          console.warn('User ID not found in AsyncStorage. Using default value or handling absence.');
          userId = 'defaultUserId'; // Example: Use a default user ID
        }

        let url = `${URL}/all-recipes`;
        // Append category filter to URL if an active category is selected
        // if (activeCategory) {
        //   url += `?category=${activeCategory.id}`;
        // }

        const response = await axios.get(url);
        const responseData = response.data;

        // Check if the response contains the 'recipes' array
        if (Array.isArray(responseData.recipes)) {
          let filteredRecipes = responseData.recipes;
          // Filter recipes based on search query if it exists
          if (searchQuery) {
            filteredRecipes = responseData.recipes.filter(recipe =>
              recipe.recipename.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          setRecipes(filteredRecipes);
        } else {
          console.error('Invalid recipes data:', responseData);
          setError('Failed to fetch recipes. Please try again.');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes. Please try again.');
        setIsLoading(false);
      }
    };

    // Fetch recipes when the component mounts, when refreshing is true, or when the active category changes
    fetchRecipes();
  }, [refreshing, searchQuery]);

  const handleRecipeDetail = (recipe) => {
    // Navigate to RecipeDetail screen with the selected recipe object
    navigation.navigate('RecipeDetail', { recipe });
  };

  const handleEditRecipe = (recipeId) => {
    // Navigate to EditRecipe screen with the selected recipe id
    navigation.navigate('EditRecipe', { recipeId });
  };

  const handleDeleteRecipe = async (recipeId) => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Send a DELETE request to the server to delete the recipe
              await axios.delete(`${URL}/delete-recipe/${recipeId}`);
              // Update the local state by filtering out the deleted recipe
              setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
              // Show a success message
              Alert.alert('Success', 'Recipe deleted successfully.');
            } catch (error) {
              console.error('Error deleting recipe:', error);
              // Show an error message or handle it as needed
              Alert.alert('Error', 'Failed to delete recipe. Please try again.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleOptionsPress = (recipe) => {
    setSelectedRecipe(recipe);
    Alert.alert(
      'Options',
      'Choose an action',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Edit', onPress: () => handleEditRecipe(recipe.id) },
        { text: 'Delete', onPress: () => handleDeleteRecipe(recipe.id), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView>
      <View style={styles.row}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          recipes.map(recipe => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeItem}
              onPress={() => handleRecipeDetail(recipe)}
            >
              {recipe.image && (
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              )}
              <Text style={styles.recipeTitle}>{recipe.recipename}</Text>
              <View style={styles.icon}>
                {/* Use SimpleLineIcons for the options icon */}
                <TouchableOpacity onPress={() => handleOptionsPress(recipe)}>
                <Entypo name="dots-three-horizontal" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    // flex: 1
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next row if needed
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recipeItem: {
    width: '48%', // Adjusted width for two recipes side by side with a small gap
    marginBottom: 10, // Adjusted margin to create space between rows
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  iconItem: {
    marginHorizontal: 10,
  },
});

export default RecipeCardScreen;
