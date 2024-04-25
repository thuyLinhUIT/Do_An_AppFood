import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardInfoDev from './CardInfoDev'
import { SafeAreaView } from 'react-native-safe-area-context';
export default function InfoTeamScreen() {

  return (
    <SafeAreaView>
    <View>
      <Text>InfoTeam</Text>
      <View style={{padding:5}}>
      {infoDetail.map((item,i)=>
         (       
           <CardInfoDev name={item.Name} bietdanh={item.bietdanh} chucvu={item.ChucVu} congviec={item.congviec} avatar={item.avatar+''} key={i}/>        
        )
      ) }  
      </View>         
    </View>
    </SafeAreaView>
  )
}
// const CardInfoDev = (name,bietdanh,chucvu,congviec,avatar) 
const infoDetail=[{Name:'Lê Ngọc Hân',ChucVu:'Thư ký',bietdanh:'Hân Ngáo Đá',avatar:'https://mega.com.vn/media/news/2306_hinh-nen-anime-nu-cho-dien-thoai1.jpg',congviec:'Thiết kế Front+BackEnd trang chi tiết, tạo + sử lý CSDL, word'},
{Name:'Mimi',ChucVu:'Báo',bietdanh:'25',congviec:'Báo làng báo xóm báo giáo chủ ',avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7Z4qX1K11VqwoFVWTw31HiSKNnKLPPeNt-xgQUKayQ&s'}];
const styles = StyleSheet.create({})