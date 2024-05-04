import { Text, View, TouchableOpacity, FlatList, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import axios from 'axios';
import Loading from '../components/loading';
import { CachedImage } from '../helpers/image';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SavedScreen({ navigation }) {

  const [meals, setMeals] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isFocused = useIsFocused();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        // console.log('Success')
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
          const info = await AsyncStorage.getItem('infoUser');
          if (info) {
            const parsedInfo = JSON.parse(info);
            // console.log(parsedInfo.favourite);
            // Xóa danh sách món ăn hiện có
            // setMeals([]);
            const promises = parsedInfo.favourite.map(id => getMealData(id));
            await Promise.all(promises);
          } else {
            // Xử lý trường hợp không có thông tin người dùng
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };
    fetchUserInfo();
    checkToken();
  }, [isFocused]);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response && response.data) {
        const newMeal = response.data.meals[0];
        // Kiểm tra xem món ăn đã tồn tại trong danh sách chưa
        const existingMeal = meals.find(meal => meal.idMeal === newMeal.idMeal);
        if (!existingMeal) {
          setMeals(prevMeals => [...prevMeals, newMeal]);
        }
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

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
        <View style={{ flex: 1, alignItems: 'center', paddingTop: hp(6) }}>
          <Text className='text-2xl font-bold text-red-600 pb-8'>Mục yêu thích</Text>
          <View className='mx-2 space-y-3'>
            <View>
              {
                meals.length == 0 ? (
                  <Loading size='large' className='mt-20' />
                ) : (
                  <FlatList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <RecipeCard item={item} navigation={navigation} />}
                    onEndReachedThreshold={0.1}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                  />
                )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const RecipeCard = ({ item, navigation }) => {
  return (
      <Animated.View entering={FadeInDown.duration(600).springify().damping(12)}>
          <Pressable
              style={{ width: '100%' }}
              className='flex justify-center mb-4 space-y-1'
              onPress={() => navigation.navigate('RecipeDetail', { ...item })}
          >
              <CachedImage
                  uri={item.strMealThumb}
                  style={{ width: wp(44), height: hp(35), borderRadius: 35 }}
                  className='bg-black/5 ml-2'
              />
              <Text style={{ fontSize: hp(1.5) }} className='font-semibold ml-2 text-neutral-600'>
                  {item.strMeal.length > 20 ? item.strMeal.slice(0, 22) + '...' : item.strMeal}
              </Text>
          </Pressable>
      </Animated.View>
  )
}
