import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import COLORS from './ColorsConstan';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.organDark,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
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
