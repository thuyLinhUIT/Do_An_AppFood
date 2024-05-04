import { View, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loading from "../components/loading";
import { CachedImage } from "../helpers/image";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardShowComment from "../components/CardShowComment";
import CommentBox from "../components/CommentBox";
import { useIsFocused } from "@react-navigation/native";

import localhost from "./localhost";

export default function RecipeDetailScreen(props) {
    const localApi=localhost;
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
  
    useEffect(() => {
        if (isFocused) {
            console.log('mới vô chi tiết')
            getMealData(item.idMeal);
            checkToken();
            getComment();
            // checkIsFavourite();
        }
    }, [isFocused]);

//     const checkIsFavourite = async (id) => {
//         const infoUser = await AsyncStorage.getItem('infoUser');
//         const user = JSON.parse(infoUser);
//         const arr=user.favourite;
// if(arr.includes(id)){
//     setIsLoggedIn(true)
// }else{setIsFavourite(false)}
//         // console.log("favorite của user", user.favourite)
//         // console.log('tao là', user.username)
//     }

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            // console.log("got meal data: ", response.data);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log("error: ", err.message);
        }
    };


    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal["strIngredient" + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    const getYoubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    };

    // Lưu yêu thích
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [content, setContent] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [arrayComment, setArrayComment] = useState([]);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
              return  setIsLoggedIn(true);
                // console.log('da dang nhap')
                // return true;
            }
            else {return setIsLoggedIn(false); }
        } catch (error) {
            console.error('Error checking token:', error);
        }
    }

    const addFavourite = async () => {
        try {
            // console.log('gui id Meal xuong back',item.idMeal)
            var token = await AsyncStorage.getItem("token");
            var valueToken = JSON.parse(token).token;
            const response = await axios
                .post(`${localApi}/UpdateFavourite`, {
                    favourite: item.idMeal,
                },
                    {
                        headers: { Authorization: `Bearer ${valueToken}`, },
                    });
            try {
                const jsonValue = JSON.stringify(response.data);
                await AsyncStorage.setItem("infoUser", jsonValue);
                // const infoUser = await AsyncStorage.getItem('infoUser');    
            } catch (error) {
                console.log("lỗi lưu", error.response.data);
            }
        } catch (error) {
            console.log("lỗi", error.response.data);
        }
    };

    const delete1Favourite = async () => {
        try {
            var token = await AsyncStorage.getItem("token");
            var valueToken = JSON.parse(token).token;
            const response = await axios
                .delete( `${localApi}/Delete1favourite/${item.idMeal}`,
                    {
                        headers: {
                            Authorization: `Bearer ${valueToken}`,
                        },
                    });
            try {
                const jsonValue = JSON.stringify(response.data);
                await AsyncStorage.setItem("infoUser", jsonValue);
                // const infoUser = await AsyncStorage.getItem('infoUser');    
            } catch (error) {
                console.log("lỗi xóa favourite", error.response.data);
            }
        } catch (error) {
            console.log("lỗi", error.response.data);
            // Alert.alert("Lỗi xóa favourite", error.response.data.message);
        }
    };

    const saveFavourite = async () => {
        if(!isLoggedIn){
            Alert.alert(
                "BẠN CHƯA ĐĂNG NHẬP",
                'Không thể thêm vào yêu thích'
            )
            return;
        } 
        else {
            if (!isFavourite) {
                setIsFavourite(!isFavourite);
                 addFavourite();

        } else {
            setIsFavourite(!isFavourite);
            delete1Favourite();
            // console.log('mon da xoa')
        }        
        } 
    }

    const saveComment = async () => {
        if (!content) {
            console.log('conten đang rỗng')
            return;
        }
        checkToken();

        if (isLoggedIn) {
            sendComment();
            console.log('gửi được')
        } else {
            // console.log('chua dang nhap')
            Alert.alert(
                'Thông báo',
                'Bạn chưa đăng nhập. Bạn có muốn đăng nhập không?',
                [
                    {
                        text: 'Đăng nhập',
                        onPress: () => {
                            navigation.navigate('Login')
                        },
                    },
                    {
                        text: 'Hủy',
                        style: 'cancel',
                        onPress: () => { },
                    },
                ],
                { cancelable: false }
            );
        }
    }

    const findInfoUser = async () => {
        try {
            var token = await AsyncStorage.getItem("token");
            // console.log(token)
            var valueToken = JSON.parse(token).token;
            var response = await axios.get(
                 `${localApi}/getUser/:hgg`,
                {
                    headers: { Authorization: `Bearer ${valueToken}` },
                }
            );
            // console.log("find Inf0" + JSON.stringify(response.data));
            const jsonValue = JSON.stringify(response.data);
            await AsyncStorage.setItem("infoUser", jsonValue);
            return response.data;
        } catch (error) {
            console.log("findInfoUser ", error);
        }
    };

    const sendComment = async () => {
        try {
            findInfoUser();
            // console.log('gui Comment xuong back', item.idMeal)
            setCurrentTime(new Date().toLocaleString())
            var token = await AsyncStorage.getItem("token");
            var valueToken = JSON.parse(token).token;
            const infoUser = await AsyncStorage.getItem("infoUser");
            const user = JSON.parse(infoUser);
            //   console.log(user);
            //  console.log("token nè",token);
            const response = await axios
                .post( `${localApi}/sendComment/`, {
                    idMeal: item.idMeal,
                    idUser: user._id,
                    avatar: user.avatar,
                    username: user.username,
                    date: currentTime,
                    content: content,
                }
                    ,
                    {
                        headers: { Authorization: `Bearer ${valueToken}`, },
                    }
                );
            // console.log('respon data send comment gửi xuống', response.data)
            setContent('')

        } catch (error) {
            // handle error
            console.log("lỗi send ngoài comment", error.response.data);
        }
    }
    const getComment = async () => {
        try {
            // console.log('lay comment');
            const response = await axios.get( `${localApi}/getComment/${item.idMeal}`);
            // console.log("mãng comment ",response.data);
            setArrayComment(response.data);
            // console.log(arrayComment);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                className="bg-white flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <StatusBar style={"light"} />
                {/* recipe image */}
                <View className="flex-row justify-center">
                    <CachedImage
                        uri={item.strMealThumb}
                        style={{
                            width: wp(98),
                            height: hp(50),
                            borderRadius: 53,
                            borderBottomLeftRadius: 40,
                            borderBottomRightRadius: 40,
                            marginTop: 4,
                        }}
                    />
                </View>
                {/* back button */}
                <View className="w-full absolute flex-row justify-between items-center pt-14">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="p-2 rounded-full ml-5 bg-white"
                    >
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={saveFavourite}
                        className="p-2 rounded-full mr-5 bg-white"
                    >
                        <HeartIcon
                            size={hp(3.5)}
                            strokeWidth={4.5}
                            color={isFavourite ? "red" : "gray"}
                        />
                    </TouchableOpacity>
                </View>

                {/* meal description */}
                {loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8">
                        <View className="space-y-2">
                            <Text
                                style={{ fontSize: hp(3) }}
                                className="font-bold flex-1 text-neutral-700"
                            >
                                {meal?.strMeal}
                            </Text>
                            <Text
                                style={{ fontSize: hp(2) }}
                                className="font-medium flex-1 text-neutral-500"
                            >
                                {meal?.strArea}
                            </Text>
                        </View>
                        {/* misc */}
                        <View className="flex-row justify-around">
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        35
                                    </Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Phút
                                    </Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        03
                                    </Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Phần
                                    </Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        103
                                    </Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Cal
                                    </Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className="bg-white rounded-full flex items-center justify-center"
                                >
                                    <Square3Stack3DIcon
                                        size={hp(4)}
                                        strokeWidth={2.5}
                                        color="#525252"
                                    />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    ></Text>
                                    <Text
                                        style={{ fontSize: hp(1.3) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        Dễ
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* ingredients */}
                        <View className="space-y-4">
                            <Text
                                style={{ fontSize: hp(2.5) }}
                                className="font-bold flex-1 text-neutral-700"
                            >
                                Nguyên liệu
                            </Text>
                            <View className="space-y-2 ml-3">
                                {ingredientsIndexes(meal).map((i) => {
                                    return (
                                        <View key={i} className="flex-row space-x-4">
                                            <View
                                                style={{ height: hp(1.5), width: hp(1.5) }}
                                                className="bg-amber-300 rounded-full"
                                            />
                                            <View className="flex-row space-x-2">
                                                <Text
                                                    style={{ fontSize: hp(1.7) }}
                                                    className="font-extrabold text-neutral-700"
                                                >
                                                    {meal["strMeasure" + i]}
                                                </Text>
                                                <Text
                                                    style={{ fontSize: hp(1.7) }}
                                                    className="font-medium text-neutral-600"
                                                >
                                                    {meal["strIngredient" + i]}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        {/* instructions */}
                        <View className="space-y-4">
                            <Text
                                style={{ fontSize: hp(2.5) }}
                                className="font-bold flex-1 text-neutral-700"
                            >
                                Instructions
                            </Text>
                            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                                {meal?.strInstructions}
                            </Text>
                        </View>
                        {/* recipe video */}
                        {meal.strYoutube && (
                            <View className="space-y-4">
                                <Text
                                    style={{ fontSize: hp(2.5) }}
                                    className="font-bold flex-1 text-neutral-700"
                                >
                                    Recipe Video
                                </Text>
                                <View>
                                    <YoutubeIframe
                                        videoId={getYoubeVideoId(meal.strYoutube)}
                                        height={hp(30)}
                                    />
                                </View>
                            </View>
                        )}
                        <View>

                            {arrayComment.map((c, i) => (
                                <CardShowComment name={c.username} dateUp={c.date} avatar={c.avatar} content={c.content} key={i} />
                            ))}

                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={{ justifyContent: 'flex-end', paddingBottom: 20 }}> 
                <KeyboardAvoidingView>
                    <CommentBox value={content}
                        handleText={setContent}
                        onPress={saveComment}
                    />
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}