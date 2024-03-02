import React, { useState,} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AntDesign, MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

//screen components 
import HomeScreen from '../screens/HomeScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import RecipeCardScreen from '../screens/RecipeCardScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import EditRecipeScreen from '../screens/EditRecipeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
//import AddCategoryScreen from '../screens/AddCategoryScreen';
//import CategoryListScreen from '../screens/CategoryListScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import UserProfile from '../screens/UserProfile';
// import ProfileScreen from '../screens/ProfileScreen';
import EditUserProfile from '../screens/EditUserProfile';


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const AddRecipeStack = createNativeStackNavigator();
const UserProfileStack = createNativeStackNavigator();
//const AddCategoryStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();


const AppNavigator = () => {
    // const [refreshing, setRefreshing] = useState(false);
    // const [activeCategory, setActiveCategory] = useState(null); // State to store the active category

    // // Function to handle category press
    // const handleCategoryPress = (category) => {
    //     setActiveCategory(category); // Set the active category state
    // };
    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="SignIn" headerMode="none">
                <AuthStack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="HomeTabs"
                    component={HomeTabs}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name='Welcome'
                    component={WelcomeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                {/* <AuthStack.Screen
                    name='CategoryList'
                    component={CategoryListScreen}
                    options={{
                        headerShown: false
                    }}
                /> */}
                <AuthStack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="EditRecipe"
                    component={EditRecipeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="RecipeDetail"
                    component={RecipeDetailScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="RecipeCard"
                    component={RecipeCardScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="UpdatePasword"
                    component={UpdatePasswordScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#f96163',
                    // borderTopRightRadius: 25,
                    // borderTopLeftRadius: 25,
                    height: 80,
                },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <AntDesign name="home" size={35} color="#fff" />,
                    headerShown: false,
                }}
            />
        
            {/* <Tab.Screen
                name="AddCategoryTab"
                component={AddCategoryStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <MaterialIcons name="category" size={35} color="#fff" />,
                    headerShown: false,
                }}
            /> */}

            <Tab.Screen
                name="AddRecipeTab"
                component={AddRecipeStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <MaterialIcons name="add-box" size={35} color="#fff" />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={UserProfileStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => <AntDesign name="user" size={35} color="#fff" />,
                    headerShown: false,
                    animation: 'none',
                }}
            />
        </Tab.Navigator>
    );
};

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{
                title: 'Home Screen',
                animation: 'none',
                headerBackTitleVisible: true,
                headerShown: false,
            }}
        />
        {/* <HomeStack.Screen
            name="AddCategory"
            component={AddCategoryScreen}
            options={{
                title: 'Create New Category',
                animation: 'none',
                headerTitleAlign: 'center',
            }}
        /> */}

        <HomeStack.Screen
            name="AddRecipe"
            component={AddRecipeScreen}
            options={{
                title: 'Create New Recipe',
                animation: 'none',
                headerTitleAlign: 'center',
            }}
        />
        
    </HomeStack.Navigator>
);

const AddRecipeStackScreen = () => (
    <AddRecipeStack.Navigator>
        <AddRecipeStack.Screen
            name="AddRecipeStack"
            component={AddRecipeScreen}
            options={{
                title: 'Create New Recipe',
                animation: 'none',
                headerTitleAlign: 'center',
            }}
        />
    </AddRecipeStack.Navigator>
);

// const AddCategoryStackScreen = () => (
//     <AddCategoryStack.Navigator>
//         <AddCategoryStack.Screen
//             name="AddCategoryStack"
//             component={AddCategoryScreen}
//             options={{
//                 title: 'Create New Category',
//                 animation: 'none',
//                 headerTitleAlign: 'center',
//             }}
//         />
//     </AddCategoryStack.Navigator>
// );

const UserProfileStackScreen = () => (
    <UserProfileStack.Navigator>
        <UserProfileStack.Screen
            name="Profile"
            component={UserProfile}
            options={{
                headerShown: false,
                headerShadowVisible: false,
                animation: 'none',
                headerStyle: {
                    backgroundColor: '#094FAF',
                },
                headerTitleStyle: {
                    color: '#fff',
                },
            }}
        />
        <UserProfileStack.Screen
            name="EditUserProfileStack"
            component={EditUserProfile}
            options={{
                title: 'Edit Profile',
                animation: 'none',
                headerBackTitleVisible: false,
            }}
        />
    </UserProfileStack.Navigator>
);

export default AppNavigator;
