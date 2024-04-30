import { View, Text } from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
export default function WelcomeScreen() {
  const animation = useRef(null);
  const navigation = useNavigation();
  return (
    <View className="bg-[#f64e32] flex-1 justify-center items-center space-y-10 relative">
      <Text>WelcomeScreen</Text>
    </View>
  );
}
