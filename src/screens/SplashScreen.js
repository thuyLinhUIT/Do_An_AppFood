import React from 'react';
import { Text, View, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function SplashScreen() {

  const circlePad1 = useSharedValue(0);
  const circlePad2 = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    circlePad1.value = 0;
    circlePad2.value = 0;
    setTimeout(() => circlePad1.value = withSpring(circlePad1.value+hp(5.5)), 100);
    setTimeout(() => circlePad2.value = withSpring(circlePad2.value+hp(3.3)), 300);
    
    setTimeout(() => navigation.navigate('Tab'), 3000)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[styles.shadeCircle1, { padding: circlePad1 }]}>
        <Animated.View style={[styles.shadeCircle2, { padding: circlePad2 }]}>
          <Image source={require('../../assets/images/img2.png')} style={{ width: hp(25), height: hp(25) }}/>
        </Animated.View>
      </Animated.View>

      <View style={styles.title}>
        <Text style={styles.titleText}>HamiliRecipe</Text>
        <Text style={{fontSize: hp(2)}}>Nơi những tinh hoa recipe hội tụ</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffaa42',
    alignItems: 'center',
    justifyContent: 'center',
  }, shadeCircle1: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 200
  }, shadeCircle2: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 200
  }, title: {
    paddingTop: 20,
    alignItems: 'center'
  }, titleText: {
    fontWeight: 'bold',
    fontSize: hp(5)
  }
});
