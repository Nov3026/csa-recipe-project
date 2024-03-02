import { Image, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function RecipeDetailScreen({ navigation, route }) {
  const { recipe: initialRecipe } = route.params;
  const [recipe, setRecipe] = useState(initialRecipe);

  useEffect(() => {
    // Update the recipe when the route parameters change (i.e., when the recipe is edited)
    setRecipe(initialRecipe);
  }, [initialRecipe]);

  const ingredientsList = recipe?.recipeingredient.split('\n');
  const instructionsList = recipe?.recipeinstruction.split('\n');

  return (
    <View style={styles.detailContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={34} color="#fff" style={styles.backArrow} />
      </Pressable>

      <View style={styles.recipeContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
        </View>

        <Text style={styles.title}>{recipe?.recipename}</Text>


        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          
        <View style={styles.description}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Description</Text>
            <Text>{recipe?.recipedescription}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.emojiCont}>
              <Text style={styles.emoji}>⏰</Text>
              <Text style={styles.text}>{recipe?.cookingtime}</Text>
            </View>

            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>🔥</Text>
              <Text style={styles.text}>{recipe?.level}</Text>
            </View>
          </View>

          <View style={styles.ingredientsContainer}>
            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            {ingredientsList &&
              ingredientsList.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.ingredient}>{ingredient.trim()}</Text>
                </View>
              ))}
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Instructions</Text>
            {instructionsList &&
              instructionsList.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.stepNumber}>{index + 1}.</Text>
                  <Text style={styles.instruction}>{instruction.trim()}</Text>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: '#f96163',
    flex: 1,
  },
  recipeContainer: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 150,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  imageContainer: {
    position: 'absolute',
    top: -100,
    left: 80,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    marginTop: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    marginRight: 5,
  },
  ingredient: {
    fontSize: 16,
  },
  description: {
    marginTop: 20,
    marginBottom: 10,
  },
  instructionsContainer: {
    marginTop: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  stepNumber: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 16,
  },
  backArrow: {
    marginHorizontal: 20,
    marginTop: 45,
  },
  emojiContainer: {
    backgroundColor: '#444',
    width: 120,
    height: 100,
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 20,
    marginLeft: 10,
  },
  emojiCont: {
    backgroundColor: '#f96',
    width: 120,
    height: 100,
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
