import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import COLORS from './ColorsConstan';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#f64e32',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: COLORS.organDark,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
