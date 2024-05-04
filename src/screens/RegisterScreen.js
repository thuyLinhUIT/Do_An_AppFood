import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

//import axios from 'axios';
import axios from "axios";
import localhost from "./localhost";

const RegisterScreen = ({ navigation }) => {

  const [dobLabel, setDobLabel] = useState("Date of Birth");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const localApi=localhost;
  // console.log(localApi)

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
  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Nhập lại Passwords không trùng");
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert("Lỗi", "Vui lòng nhập đúng định dạng email");
      return;
    }
    axios
      .post(`${localApi}/Register`, {
        username: fullname,
        password: password,
        email: email,
        brithday: selectedDate,
      })
      .then(function (response) {
        // handle success
        // alert(JSON.stringify(response.data));
        Alert.alert(
          "Đăng ký thành công",
          "Nhấn OK để chuyển hướng đến Đăng nhập",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error.response.data)
        Alert.alert("Lỗi", error.response.data.message);
      });
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

    //navigation.navigate('Login'); // Replace 'Login' with your desired screen name.
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/food2.jpg")}
            style={{
              width: 400,
              height: 200,
              transform: [{ rotate: "-5deg" }],
            }}
          />

          <Text
            style={{
              // fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
              paddingTop: 25,
            }}
          >
            Register
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={require("../../assets/images/logo-google.jpg")}
              style={{ width: 44, height: 44 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "#0e58ed",
            }}
          >
            <Image
              source={require("../../assets/images/logo-facebook.jpg")}
              style={{ width: 44, height: 44 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 5,
              backgroundColor: "#000",
            }}
          >
            <Image
              source={require("../../assets/images/logo-x.jpg")}
              style={{ width: 54, height: 54 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 10 }}>
          Or, register with email ...
        </Text>

        <InputField
          label={"Full Name"}
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

        <InputField
          label={"Email ID"}
          icon={
            <Ionicons
              name="at-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={email}
          handleText={setEmail}
        />

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
          label={"Confirm Password"}
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

        <CustomButton label={"Register"} onPress={handleRegister} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;