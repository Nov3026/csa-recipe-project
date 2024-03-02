import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'


export default function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/chef-1.png')} 
        style={styles.image}/>
      </View>
      <View style={styles.text}>
        <Text style={styles.textBold}>Learn 50K+ Recipes</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Cook Like A Chef</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('HomeTabs')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>  
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f96163',
        justifyContent: 'center',
        
    },
    image:{
        width: '100%',
        height: '100%',
        // alignSelf: 'center',
        resizeMode: 'contain'
        
    },
    imageContainer:{
        // marginTop: 100,
        width: '100%', 
        height: 260,
        borderRadius: '50%',
        // alignSelf: 'center'
    },
    text:{
        marginTop: 30
    },
    textBold:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    headerContainer:{
        marginTop: 30
    },
    header:{
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000'
    },
    buttonContainer:{
        backgroundColor: '#fff',
        marginHorizontal: 45,
        marginTop: 25,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

