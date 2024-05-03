import { Text, View, TouchableOpacity ,KeyboardAvoidingView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';

import { useIsFocused } from "@react-navigation/native";
import CommentBox from '../components/CommentBox';

export default function SavedScreen({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  const [content,setContent]=useState('');

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
// console.log('thòi gian hien tai',currentTime);
  // useEffect(() => {
  //   checkToken();
  // }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      // Thực hiện cập nhật thông tin hồ sơ ở đây
      // console.log("Cập nhật thông tin hồ sơ");
      // getUserInfo();
      checkToken();
    }
  }, [isFocused]);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        console.log('da dang nhap')
      }
      else{setIsLoggedIn(false); }
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
          <KeyboardAvoidingView>
<CommentBox   value={content}
            handleText={setContent}
  />
</KeyboardAvoidingView>
        </View>
        

      )}
    </View>
  );
};
