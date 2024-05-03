import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TouchableCustom({
nameIcon,
  fieldButtonLabel,
 color,onPress
}) {
  return (
    <View>
          <TouchableOpacity style={[{ flexDirection: "row", padding: 15 ,},fieldButtonLabel==='Log out'&&{alignSelf:'flex-end'}]} onPress={onPress}>
              <Ionicons
                name={nameIcon}
                size={30}
                color={color}
                boldText
              />
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 5,
                  fontWeight: "bold",
                  color:color,
                }}
              >
                {fieldButtonLabel}
              </Text>
            </TouchableOpacity>   
    </View>
  );
}