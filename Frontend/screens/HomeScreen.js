import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
//import CategoryListScreen from './CategoryListScreen';
import RecipeCardScreen from './RecipeCardScreen';
import SearchScreen from './SearchScreen';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // const handleCategoryPress = (category) => {
  //   setSelectedCategory(category);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchScreen onSearch={handleSearch} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      >
        {/* <View style={styles.categoryListContainer}>
          <Text style={styles.heading}>Categories</Text>
          <CategoryListScreen
            refreshing={refreshing}
            onCategoryPress={handleCategoryPress}
          />
        </View> */}
        <View style={styles.recipeContainer}>
          <Text style={styles.heading}>Recipes</Text>
          <RecipeCardScreen
            refreshing={refreshing}
            searchQuery={searchQuery}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 60,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
  },
  categoryListContainer: {
    marginBottom: 20,
  },
  recipeContainer: {
    marginBottom: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

