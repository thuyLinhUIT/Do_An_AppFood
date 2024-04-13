import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{alignItems: 'center'}}>
        <Image
          source={require("../../assets/images/food1.jpg")}
          style={{ width: 200, height: 200, transform: [{ rotate: "-5deg" }] }}
        />
        </View>
        
        <Text
          style={{
            // fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Login
        </Text>
        <KeyboardAvoidingView behavior="height">
          <InputField
            label={"Email ID"}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            value={email}
            handleText={setEmail}
            type={email}
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
            fieldButtonLabel={"Forgot?"}
            value={password}
            handleText={setPassword}
            fieldButtonFunction={() => {}}
          />
        </KeyboardAvoidingView>
        <CustomButton label={"Login"} onPress={() => {}} />
        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, login with ...
        </Text>

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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#f64e32", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
