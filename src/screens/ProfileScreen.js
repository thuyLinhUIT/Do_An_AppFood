import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

import Info from "../components/Info";
import COLORS from "../components/ColorsConstan";
import TouchableCustom from "../components/TouchableCustom";
import ChangeInfo from "../components/ChangeInfo";
// import { user } from "../../../BackEnd/routes/routes";

// import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const adjustedWidth = width - 50;

export default function ProfileScreen({ navigation }) {
  const [showChange, setShowChange] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [brithday, setBrithday] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");

  // const defaultAvatar = require('../../assets/images/quocky.png');
  // const defaultAvatar = require('../../assets/images/avt.png');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Thực hiện cập nhật thông tin hồ sơ ở đây
      console.log("Cập nhật thông tin hồ sơ");
      getUserInfo();
    }
  }, [isFocused]);

  //xuống csdl lấy thông tin
  const findInfoUser = async () => {
    try {
      var token = await AsyncStorage.getItem("token");
      // console.log(token)
      var valueToken = JSON.parse(token).token;
      var response = await axios.get(
        "http://192.168.1.198:3000/api/getUser/:hgg",
        {
          headers: { Authorization: `Bearer ${valueToken}` },
        }
      );
      console.log("find Inf0" + JSON.stringify(response.data));
      const jsonValue = JSON.stringify(response.data);
      await AsyncStorage.setItem("infoUser", jsonValue);
      return response.data;
    } catch (error) {
      console.log("findInfoUser ", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const infoUser = await AsyncStorage.getItem("infoUser");
      // console.log('infouser'+infoUser)
      if (infoUser) {
        // console.log('if')
        const user = JSON.parse(infoUser);
        setNameUser(user.username);
        setEmail(user.email);
        setGender(user.gender);
        setBrithday(user.brithday.slice(0, 10));
        setAvatar(user.avatar);
        setPhone(user.phoneNumber)
      } else {
        // console.log('else')
        // Thực hiện tìm User() nếu infoUser không tồn t
        findInfoUser().then((user) => {
          // console.log('show thong tin')
          // console.log('user: ',user)
          setNameUser(user.username);
          setEmail(user.email);
          setGender(user.gender);
          setBrithday(user.brithday.slice(0, 10));
          setAvatar(user.avatar);
          setPhone(user.phoneNumber)
        });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const HandleLogOut = async () => {
    AsyncStorage.clear()
      .then(() => {
        console.log("Đã xóa tất cả dữ liệu trong AsyncStorage");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa dữ liệu:", error);
      });
  };

  const handleLogoutFull = () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc muốn đăng xuất?",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: () => {
            // Thực hiện đăng xuất (ví dụ: xóa token, xóa thông tin người dùng, ...)
            // ...
            // Sau khi đăng xuất, chuyển hướng về màn hình đăng nhập
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };
  // Gọi hàm getUserInfo() để bắt đầu quá trình

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.organDark }}>
      {showChange ? <ChangeInfo /> : null}
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
          <View
            style={{ alignItems: "center", paddingTop: 40, paddingBottom: 10 }}
          >
            <View style={styles.containerAvatar}>
              {/* <Image
              // source={require("../../assets/images/food1.jpg")}
              source={{uri:avatar}}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            /> */}
              {avatar && (
                <Image
                  source={{ uri: avatar }}
                  style={{ width: 200, height: 200, borderRadius: 100 }}
                />
              )}
          
              <Ionicons
                name="camera"
                size={35}
                color="black"
                boldText
                style={styles.editIcon}
                onPress={() => {
                  navigation.navigate("Avatar");
                }}
              />
            
              
            </View>
          </View>
          <Text style={styles.nameUser} numberOfLines={1}>
             {nameUser}
          </Text>
          <Text style={styles.emailUser} numberOfLines={1} ellipsizeMode="tail">
            {email}
          </Text>
        </View>
        <View style={styles.containUser}>
          <Info
            infomation={"Email"}
            detail={email}
            onPress={() => {
              setShowChange(true);
            }}
          />
          <Info infomation={"Điện Thoại"} detail={phone} />
          <Info infomation={"Giới tính"} detail={gender} />
          <Info infomation={"Ngày sinh"} detail={brithday} />
          <View style={{ paddingTop: 10 }}>
            <View style={styles.horizontalLine} />

            <TouchableCustom
              nameIcon={"lock-open-outline"}
              fieldButtonLabel={"Thay đổi Thông tin/Mật khẩu"}
              color={"green"}
              onPress={() => {
                navigation.navigate("AdjustInfoUser");
              }}
            />
            <View style={styles.horizontalLine} />
            <TouchableCustom
              nameIcon={"heart-circle"}
              fieldButtonLabel={"Công thức đã lưu"}
              color={"blue"}
            />

            <View style={styles.horizontalLine} />
            <TouchableCustom
              nameIcon={"chatbox-ellipses-outline"}
              fieldButtonLabel={"Thông tin liên hệ-Nhóm thực hiện"}
              color={"#B5178C"}
              onPress={() => {
                navigation.navigate("InfoDev");
              }}
            />

            <View style={styles.horizontalLine} />
            <TouchableCustom
              nameIcon={"log-out"}
              fieldButtonLabel={"Log out"}
              color={"red"}
              onPress={HandleLogOut}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    adjustedWidth, // Độ dài của đường ngang
    // padding: 5,
  },
  containUser: {
    backgroundColor: "#fff",
    borderTopStartRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "grey",
  },
  nameUser: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 13,
    color: COLORS.white,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
  emailUser: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 13,
    color: COLORS.white,
    textAlign: "center",
    padding: 10,
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 5,
    borderWidth:2,
    borderRadius:10,
    borderColor:'white',
    height:35,
    width:40,
    paddingHorizontal:2,
    justifyContent: 'center', 
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  containerAvatar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});