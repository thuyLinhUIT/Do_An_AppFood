import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "./HomeScreen";
import InfoTeamScreen from "./InfoTeamScreen";
import ProfileScreen from "./ProfileScreen";
import AvatarScreen from "./AvatarScreen";
import AdjustInfoUser from "./AdjustInfoUser";
const Stack = createNativeStackNavigator();
const Linh = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InfoDev" component={InfoTeamScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        <Stack.Screen name="AdjustInfoUser" component={AdjustInfoUser} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Linh;