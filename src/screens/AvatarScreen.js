import React, { useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,Alert
} from "react-native";
import TouchableCustom from "../components/TouchableCustom";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { upload } from "cloudinary-react-native";

import * as ImagePickers from "expo-image-picker";
import * as ImagePicker from 'expo-image-picker';
// import { upload } from "cloudinary-react-native";
import { cld } from "../../cloudinary/config";
import localhost from "./localhost";

const { width, height } = Dimensions.get("window");

const AvatarScreen = ({ navigation }) => {

  const localApi=localhost;
  const [image, setImage] = useState(null);
    const options = {
    upload_preset: "ml_default",
    unsigned: true, 
  };
  
  const LayHinh = async () => {
    try {
    let  result = await ImagePickers.launchImageLibraryAsync({
        mediaTypes: ImagePickers.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      upload(cld, {
        file: result.assets[0].uri,
        options: options,
        callback: (error, response) => {
          // console.log("thong tin reponse", response);
          setImage(response.url);
        },
      });
    } catch (error) {
      console.log("lỗi lúc lấy hình từ thư viện", error);
    }     
  };

  // const ChupHinh = async () => {
  //   try {
  //     const result = await ImagePickers.launchCameraAsync({
  //       mediaTypes: ImagePickers.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });
  //     console.log('ket qua chup',result)
  //   } catch (error) {
  //     console.log('Lôic chụp ảnh',error)
  //   }
       
  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };
  let result ;
  const pickImage = async () => {
    // console.log('code mới')
    // No permissions request is necessary for launching the image library
    try {
       result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } catch (error) {
         console.log("Loi chup hinh: " + error);
    }
    
    // console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // console.log("Thong tin hinh ne: " + image);

  const saveAvatar = async () => {
    // console.log("bat dat save");

    try {
      var token = await AsyncStorage.getItem("token");
      var valueToken = JSON.parse(token).token;
      // console.log(valueToken);

      const response=await axios.post(
        `${localApi}/uploadAvatar`,
        { image },
        {
          headers: {
            Authorization: `Bearer ${valueToken}`,
          },
        }
      );

      // console.log("ket qua", JSON.stringify(response.data));
      try {const jsonValue = JSON.stringify(response.data);
        await AsyncStorage.setItem("infoUser", jsonValue);
        const infoUser = await AsyncStorage.getItem('infoUser');
        // console.log('save xong',infoUser)
        Alert.alert(
          "Cập nhật ảnh đại diện thành công",
          "Nhấn OK để chuyển hướng về ",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Tài khoản"),           
            },
          ]
        );  
        
      } catch (error) {
        console.log('chuyen trang',error)
      }
        
    
    } catch (error) {
      // handle error
      console.log(error.response.data);
      // Alert.alert("Lỗi", error.response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.containerImage}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        )}
      </View>

      <View style={styles.containerButtom}>
        <TouchableOpacity style={styles.Buttons} onPress={LayHinh}>
          <Text style={styles.TextButtom}>Lấy từ thư viện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Buttons} onPress={pickImage}>
          <Text style={styles.TextButtom}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SaveButtom}>
        <TouchableCustom
          nameIcon={"save"}
          fieldButtonLabel={"Save"}
          color={"green"}
          onPress={saveAvatar}
        />
      </View>
    </SafeAreaView>
  );
};

export default AvatarScreen;
const styles = StyleSheet.create({
  containerImage: {
    // paddingTop: 40,
    // paddingBottom:10,
    marginTop:50,
    padding: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "blue",
    borderWidth: 1,
    height: 350,
    width:width-20,
    alignSelf:'center',
  },
  containerButtom: {
    marginTop: 100,
    marginBottom:10,
    flexDirection: "row",
    justifyContent: "space-around",
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
    width:width-10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    borderRadius:10
  },
});