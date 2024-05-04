import { Text, View, Image, StyleSheet, StatusBar, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Categories from '../components/cat';
import Recipes from '../components/recipes';
import { useIsFocused } from "@react-navigation/native";
import localhost from "./localhost";

export default function HomeScreen({ navigation }) {
  const localApi=localhost;
  // Profile
  const [nameUser, setNameUser] = useState("");

  const getInfo = () => {
    AsyncStorage.getItem("token").then((token) => {
      // console.log(token)
      const valueToken = JSON.parse(token).token;
      axios
        .get(`${localApi}/getUser/:hgg`, {
          headers: { Authorization: `Bearer ${valueToken}` },
        })
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          const setInfoUser = async () => {
            const jsonValue = JSON.stringify(response.data);
            await AsyncStorage.setItem("infoUser", jsonValue);
            // const showToken= await AsyncStorage.getItem('my-key')
            // console.log(showToken)
          };
          setInfoUser().then(() => {});
          AsyncStorage.getItem("infoUser").then((key) => {
            const user = JSON.parse(key);
            setNameUser(user.email);
          });
     
        })
        .catch(function (error) {
          // handle error
          Alert.alert("Lỗi", error.response.data.message);
        });
    });
  };

  //Check login
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   checkToken();
  // }, [isFocused]);

  // const checkToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token) {
  //       setIsLoggedIn(true);
  //       console.log('Success')
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   } catch (error) {
  //     console.error('Error checking token:', error);
  //   }
  // }

  // Recipe
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, [])

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      //console.log('category: ', response.data);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      //console.log('category: ', response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  return (
    <View>
      <StatusBar style="dark" />
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="space-y-6 pt-4"
        >

          <View className="mx-4 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => navigation.navigate('Tài khoản')} >
              <Image
                source={require('../../assets/images/avt.png')}
                style={{ height: hp(5), width: hp(5) }}
                className="rounded-full"
              />
            </TouchableOpacity>
            <Ionicons name="notifications" size={hp(3.5)} color="black" />
          </View>

          <View className="mx-4 space-y-1 mb-2">
            <View>
              <Text
                style={{
                  fontSize: hp(3.5),
                }}
                className="font-bold text-neutral-800"
              >
                Nơi khơi nguồn
              </Text>
            </View>

            <Text
              style={{
                fontSize: hp(3.5),
              }}
              className="font-extrabold text-[#f64e32]"
            >
              Sự yêu thích nấu ăn
            </Text>
          </View>

          <View className="mx-4 flex-row items-center border rounded-xl border-black p-[6px]">
            <View className="bg-white rounded-full p-2">
              <Ionicons name="search" size={24} color="grey" />
            </View>
            <TextInput
              placeholder="Tìm kiếm công thức"
              placeholderTextColor={"gray"}
              style={{
                fontSize: hp(1.7),
              }}
              className="flex-1 text-base mb-1 pl-1 tracking-widest"
            />
          </View>

          <View>
            {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
          </View>

          <View>
            <Recipes meals={meals} categories={categories} />
          </View>

        </ScrollView>


      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
