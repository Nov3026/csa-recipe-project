import { 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import axios from 'axios'
import { URL } from './constants';

export default function AddCategoryScreen() {
  const [data, setData] = useState({
    name: '',
  })

  const handleCategory = ({navigation}) => {
    if(!data.name){
      Alert.alert('Missing field', 'Your have some missing field', [
        {text: 'Okay'}
      ]);
      return;
    };

    axios.post(`${URL}/create-category`, {
      name: data.name
    }, {
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      console.log('Response:', response.data);
      Alert.alert('Success', 'Category created successfully', [
        { text: 'Okay', onPress: () => resetForm() }
      ]);

    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
          // Handle error with a message
          Alert.alert(
              'Category Error', err.response.data.message,
              [{ text: 'Okay' }]
          );
      } else {
          // Handle other errors
          console.log('Error!', err);
  
          // Provide a generic error message to the user
          Alert.alert(
              'Category Error', 'An unexpected error occurred during category creation',
              [{ text: 'Okay' }]
          );
      }
  });    
  }

  const resetForm = () => {
    setData({
      name: '',
    });
  };

  return (
    // <KeyboardAvoidingView behavior='padding'
        //     keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
        //     style={styles.container}
        // >
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView
                SafeAreaView showsVerticalScrollIndicator={false}
                style={{ ...styles.container, paddingHorizontal: 35, }} // paddingTop: 130,
            >
                <Text style={styles.categoryText}>Create New Category</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Category Name"
                        placeholderTextColor='gray'
                        value={data.name}
                        onChangeText={(val) => setData({ ...data, name: val })}
                    />

                    <TouchableOpacity
                        style={styles.addButton}
                         onPress={handleCategory}
                    >
                        <Text style={styles.buttonText}>Add Category</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        // </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff', // Background color
    // padding: 10,  // All sides are 10
    // paddingHorizontal: 50,  // Left and right are 20
},
categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Text color
    marginBottom: 20,
    alignSelf: "center"

},
form: {
    justifyContent: "space-between",
    alignContent: "left"
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
})