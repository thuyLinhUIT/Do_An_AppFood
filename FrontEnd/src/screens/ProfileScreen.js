import React from "react";
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
import Info from "../components/Info";
import COLORS from "../components/ColorsConstan";
import TouchableCustom from "../components/TouchableCustom";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const adjustedWidth = width - 50;

export default function ProfileScreen ({ navigation }) {
  console.log(navigation);
  const naviKhac=useNavigation();
  console.log(naviKhac)
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.organDark }}>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
          <View style={{ alignItems: "center", paddingTop: 40,paddingBottom:10 }}>
            <View style={styles.containerAvatar}>
            <Image
              source={require("../../assets/images/food1.jpg")}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
            <Ionicons
                name='camera'
                size={35}
                color='black'
                boldText  
                style={styles.editIcon}   
                onPress={
                  () => {navigation.navigate("Avatar");}}
              />
              </View>
          </View>
          <Text style={styles.nameUser} numberOfLines={1}>
            Becca William
          </Text>
          <Text style={styles.emailUser} numberOfLines={1} ellipsizeMode="tail">
            8800112234679
          </Text>
        </View>
        <View style={styles.containUser}>
          <Info infomation={"emmail"} detail={"aoo"} />
          <Info infomation={"Dien thoai"} detail={"aoo"} />
          <Info infomation={"Gioi tinh"} detail={"linh hoat"} />
          <Info infomation={"Ngày sinh"} detail={"linh hoat"} />
          <View style={{ paddingTop: 10 }}>
            <View style={styles.horizontalLine} />

            <TouchableCustom
              nameIcon={"lock-open-outline"}
              fieldButtonLabel={"Thay đổi Mật khẩu"}
              color={"green"}
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
              onPress={
                () => {navigation.navigate("InfoDev");}}
            />

            <View style={styles.horizontalLine} />
            <TouchableCustom
              nameIcon={"log-out"}
              fieldButtonLabel={"Log out"}
              color={"red"}
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
    fontWeight: 'bold',
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
    position: 'absolute',
    bottom: 10,
    right: 10,
    // Thêm các kiểu khác cho biểu tượng chỉnh sửa tại đây
  },  containerAvatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
