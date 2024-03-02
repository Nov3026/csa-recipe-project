// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
// import axios from 'axios';
// import { URL } from './constants';

// export default function CategoryListScreen({ refreshing, onCategoryPress }) {
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${URL}/all-category`);
//         const responseData = response.data;

//         if (Array.isArray(responseData.categories)) {
//           setCategories(responseData.categories);
//         } else {
//           console.error('Invalid categories data:', responseData);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, [refreshing]);

//   const handleCategoryPress = async (category) => {
//     setActiveCategory(category);
//     try {
//       // Make HTTP GET request to fetch recipes by category ID
//       const response = await axios.get(`${URL}/recipe-category/${category.id}`);
//       const { recipes } = response.data;
      
//       // Call the callback function with the selected category and recipes
//       onCategoryPress(category, recipes);
//     } catch (error) {
//       console.error('Error fetching recipes by category:', error);
//       // Handle error as needed
//     }
//   };

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.scrollViewContainer}
//     >
//       {categories.map((category) => (
//        <TouchableOpacity
//         key={category.id}
//         onPress={() => handleCategoryPress(category)}
//         style={[
//          styles.categoryItem,
//          activeCategory && activeCategory.id === category.id && styles.activeCategory,
//        ]}
//      >
//           <Text style={{ color: activeCategory && activeCategory.id === category.id ? '#fff' : '#000' }}>{category.name}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollViewContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//   },
//   categoryItem: {
//     padding: 10,
//     marginVertical: 5,
//     borderWidth: 1,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 7,
//     marginRight: 10,
//     borderColor: '#eee',
//   },
//   activeCategory: {
//     borderColor: '#f96163',
//     backgroundColor: '#f96163',
//   },
// });
