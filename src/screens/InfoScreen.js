import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardInfoDev from '../components/CardInfoDev'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfoScreen() {

  return (
    <SafeAreaView>
    <View>
    <Text
          style={{
            // fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginTop:20,
            marginVertical: 5,
            textAlign: "center",
          }}
        >
          Thông tin nhóm thực hiện
        </Text>
      <View style={{padding:5}}>
      {infoDetail.map((item,i)=>
         (       
           <CardInfoDev name={item.Name} bietdanh={item.bietdanh} chucvu={item.ChucVu} congviec={item.congviec} avatar={item.avatar+''}  mssv={item.mssv} key={i}/>        
        )
      ) }  
      </View>         
    </View>
    </SafeAreaView>
  )
}
// const CardInfoDev = (name,bietdanh,chucvu,congviec,avatar) 
const infoDetail=[
{Name:'Lê Ngọc Hân',ChucVu:'Thư ký',bietdanh:'Hân Ngáo Đá',avatar:'https://hinhnen4k.com/wp-content/uploads/2023/01/avatar-tho-cute-2.jpg',congviec:'Thiết kế Front+ BackEnd trang chi tiết, word', mssv:'22*22***'},
{Name:'Dương Bảo Minh',ChucVu:'Giám đốc điều hành',bietdanh:'Hotboy',congviec:'Xây dựng thiết kế khung, Back + Front Home,SaveScreen,navigation, xây dựng CSDL, merger code',avatar:'https://img.freepik.com/premium-vector/young-man-anime-style-character-vector-illustration-design-manga-anime-boy_147933-4763.jpg',mssv:'21*22***'},
{Name:'Thùy Linh',ChucVu:'Lao công',bietdanh:'Linh dễ thương',avatar:'https://www.shutterstock.com/shutterstock/photos/2235047505/display_1500/stock-vector-young-girl-anime-style-character-vector-illustration-design-manga-anime-girl-hair-faces-cartoon-2235047505.jpg',congviec:'Thiết kế Front+ BackEnd trang Login,Register,Profile, Avatar, AdjustInfoUser, InfoDev, comment;  ppt, thuyết trình',mssv:'21*22***'},];