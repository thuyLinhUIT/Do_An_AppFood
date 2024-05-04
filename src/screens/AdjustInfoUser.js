import React, { useState,useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import Combobox from "../components/ComboBox";

import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import axios from "axios";
import localhost from "./localhost";
// import { set } from "mongoose";

const { width, height } = Dimensions.get('window');

const AdjustInfoUser = ({ navigation }) => {
  // const [dobLabel, setDobLabel] = useState("Date of Birth");
  const localApi=localhost;
  const [dobLabel, setDobLabel] = useState("Date of Birth");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const getUserInfo = async () => {
    const infoUser = await AsyncStorage.getItem("infoUser");
    const user = JSON.parse(infoUser);
    setFullName(user.username);
    setPhone(user.phoneNumber);
    setGender(user.gender);
    setDobLabel(user.brithday);
    // setDobLabel()
    // console.log('điều chỉnh',fullname)
  };
  useEffect(() => {
    // Gọi hàm getUserInfo() chỉ một lần sau khi component được render
    getUserInfo();      
  }, []);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hienthi = `${day} / ${month} / ${year}`;

      // setDobLabel(date.toString());
      setDobLabel(hienthi);
    }
    setShowDatePicker(false);
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const updateInfoUser = async() => {
    try {
    var token = await AsyncStorage.getItem("token");
    var valueToken = JSON.parse(token).token;
    const response=await axios
      .put(`${localApi}/UploadInfoUser`, {
        username: fullname,
        gender: gender,        
        brithday: selectedDate,
        phoneNumber:phone
      },
      {
        headers: {  Authorization: `Bearer ${valueToken}`,
        },
      });
      try { console.log('respon data',response.data)
       
      const jsonValue = JSON.stringify(response.data);
      await AsyncStorage.setItem("infoUser", jsonValue);
      // const infoUser = await AsyncStorage.getItem('infoUser');
      Alert.alert(
        "Thay đổi thành công",
        "Nhấn OK để về lại Tài khoản",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Tài khoản"),
          },
        ]
      );
        
      } catch (error) {
        console.log("lỗi luu",error.response.data);
      }
    
      
      }catch(error) {
        // handle error
        console.log("lỗi",error.response.data);
        Alert.alert("Lỗi front nhận", error.response.data.message);
      };
    // fetch('http://192.168.1.198:3000/api/Dangky',{
    //   method:'POST',
    //   body:JSON.stringify({
    //       username: fullname,
    //       password: password,
    //       email:email,
    //      }),
    //   headers:{
    //     'Content-Type':'application/json'
    //   }
    // })
  };
  // const handelUpdate=()=>{
  //   console.log(Combobox.data)
  // }
  const comeBack = () => {
    navigation.navigate("Tài khoản");
  };
  console.log("chọn giới tính",gender);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              // fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 10,
              paddingTop: 25,
            }}
          >
            Cập nhật Thông tin
          </Text>
        </View>

        <InputField
          label={fullname}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={fullname}
          handleText={setFullName}
        />
        <View style={styles.gender}>
          <Text>Giới tính : </Text>
          <Combobox giatri={setGender} />
        </View>

             <InputField
          label={"Số điện thoại"}
          icon={
            <Ionicons
              name="call-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="numeric"      
          value={phone}
          handleText={setPhone}
        />

              <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.containerButton}>
          <CustomButton label={"Quay lại"} onPress={comeBack} />
          <CustomButton label={"Cập nhật"} colorBack={"#23D3D3"} onPress={updateInfoUser} />
        </View>

        {/* Change PassWord */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              // fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 10,
              paddingTop: 25,
            }}
          >
            Cập nhật Password
          </Text>
        </View>
        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={password}
          handleText={setPassword}
        />

        <InputField
          label={"New Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={newPassword}
          handleText={setNewPassword}
        />
        <InputField
          label={"Confirm New Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={confirmPassword}
          handleText={setConfirmPassword}
        />

        <View style={styles.containerButton}>
          <CustomButton label={"Quay lại"} onPress={comeBack} />
          <CustomButton label={"Cập nhật"} colorBack={"#23D3D3"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdjustInfoUser;
const styles = StyleSheet.create({
  containerImage: {
    padding: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    height: 350,
    width,
    // alignSelf:'center',
   
  },
  containerButton: {
    // marginTop: 150,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  Buttons: {
    width: 180,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#49E5D2",
    justifyContent: "center",
    alignItems: "center",
  },
  TextButtom: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: "#110AA6",
  },
  SaveButtom: {
    margin: 5,
    padding: 5,
    alignItems: "center",
    borderColor: "black",
    backgroundColor: "red",
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  gender: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});