// HomeScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Modal, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const HomeScreen = ({ navigation }) => {
  const [nameUser, setNameUser] = useState("");

  const getInfo = () => {
    AsyncStorage.getItem("token").then((token) => {
      // console.log(token)
      const valueToken = JSON.parse(token).token;
      axios
        .get("http://192.168.1.198:3000/api/getUser/:hgg", {
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

  const checkTokenAndNavigate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Token exists, navigate to Profile screen
        // Replace 'ProfileScreen' with your actual screen name
        navigation.navigate('Profile');
      } else {
        // Token does not exist, navigate to Login screen
        // Replace 'LoginScreen' with your actual screen name
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Awesome App!</Text>
      <Text style={styles.subtitle}>This is the Home Screen.</Text>
      <Text style={styles.title} onPress={getInfo}>
        Lấy thông tin !
      </Text>
      <Text style={styles.title}>{nameUser}</Text>
      <Text style={styles.title} onPress={checkTokenAndNavigate}>
        Chuyen trang ! 
      </Text>
      {/* <View style={styles.containerModal}>
      <Button title="Show Pop-up" onPress={toggleModal} />

      <Modal isVisible={isModalVisible} backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <Text>Hello, this is a custom pop-up!</Text>
          <Button title="Hide Pop-up" onPress={toggleModal} />
        </View>
      </Modal>
    </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default HomeScreen;