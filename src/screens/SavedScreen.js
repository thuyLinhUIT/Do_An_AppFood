import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';

export default function SavedScreen({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>ĐỂ XEM MỤC YÊU THÍCH</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'tomato', marginTop: 10 }}>VUI LÒNG ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Mục yêu thích</Text>
        </View>
      )}
    </View>
  );
};
