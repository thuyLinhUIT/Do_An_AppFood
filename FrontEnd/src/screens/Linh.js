import { View,Text } from "react-native"
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();
const Linh= ()=>{
    return (
        <NavigationContainer>
     
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>   
      
        <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
       </Stack.Navigator>
          
      </NavigationContainer>
    )
}
export default Linh;