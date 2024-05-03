import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import COLORS from './ColorsConstan';

export default function CustomButton({label, onPress, colorBack }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // backgroundColor: COLORS.organDark,
        // backgroundColor: background || COLORS.organDark,
        backgroundColor: colorBack || COLORS.organDark,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        marginHorizontal:2
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: COLORS.white,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}