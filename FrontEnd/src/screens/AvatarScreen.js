import React, { useState, useRef } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text ,Dimensions} from "react-native";
import TouchableCustom from "../components/TouchableCustom";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import * as ImagePickers from "expo-image-picker";

const {width,height} =Dimensions.get('window');

const AvatarScreen = () => {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);

  const LayHinh = async () => {
    let result = await ImagePickers.launchImageLibraryAsync({
      mediaTypes: ImagePickers.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // console.log(result);
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
 
  const ChupHinh = async () => {
    let result = await ImagePickers.launchCameraAsync({
      mediaTypes: ImagePickers.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  console.log("Thong tin hinh ne: "+image);
  console.log(image)
  // const ImagePicker=()=>{
  //   let options={ storageOptions:{path:'image'},}

  //   launchImageLibrary(options,response =>{
  //     setImage(response.assets[0].uri)
  //     console.log(response.assets[0].uri);
  //   })
  // }

  // const takePhoto = async () => {
  //   if (cameraRef.current) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await cameraRef.current.takePictureAsync(options);
  //     setImage(data.uri);
  //   }
  // };

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
        <TouchableOpacity style={styles.Buttons} onPress={ChupHinh}>
          <Text style={styles.TextButtom}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SaveButtom}> 
      <TouchableCustom
              nameIcon={"save"}
              fieldButtonLabel={"Save"}
              color={"green"}
            />
      </View>
      
    </SafeAreaView>
  );
};

export default AvatarScreen;
const styles = StyleSheet.create({
  containerImage:{   
    // paddingTop: 40,
    // paddingBottom:10,
    padding:10,
    margin:20,
    alignItems: "center",
    justifyContent:'center',
    borderColor:'black',
    borderWidth:1,
    height:350,
    width,
  },
  containerButtom: {
    marginTop: 150,
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
  SaveButtom:{
    margin:5,
    padding:5, alignItems: "center",borderColor:'black',backgroundColor:'red',
    width,
    justifyContent:'center',
    alignItems: "center",
  }
});
