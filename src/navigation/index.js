import React from 'react'
// AppNavigation - import
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
// TabNavigation - import
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfoScreen from '../screens/InfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';
import { Ionicons } from '@expo/vector-icons';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import AvatarScreen from '../screens/AvatarScreen';
import AdjustInfoUser from '../screens/AdjustInfoUser';

// Code - TabNavigation

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName='Trang chủ'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          let rn = route.name;

          if (rn === 'Trang chủ') {
            icon = focused ? 'home' : 'home-outline';
          } else if (rn === 'Yêu thích') {
            icon = focused ? 'heart-circle' : 'heart-circle-outline';
          } else if (rn === 'Thông tin') {
            icon = focused ? 'list-circle' : 'list-circle-outline';
          } else if (rn === 'Tài khoản') {
            icon = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={icon} size={size} color={color} />
        },
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
        tabBarLableStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 }
      })}

    >
      <Tab.Screen name='Trang chủ' component={HomeScreen} />
      <Tab.Screen name='Yêu thích' component={SavedScreen} />
      <Tab.Screen name='Thông tin' component={InfoScreen} />
      <Tab.Screen name='Tài khoản' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Code - AppNavigation

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Tab' component={TabNavigation} />
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name="AdjustInfoUser" component={AdjustInfoUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;