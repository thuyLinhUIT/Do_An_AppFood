import { View, Text, TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

export default function ChangeInfo() {
  return (
    <View style={{position:'absolute', zIndex:10,top:'50%',backgroundColor:'blue', alignSelf:'center'}}>
      <Text>ChangeInfo</Text>
      <TextInput></TextInput>
      <View style={styles.containerButtom}>
        <TouchableOpacity style={styles.Buttons} >
          <Text style={styles.TextButtom}>Trở lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Buttons} >
          <Text style={styles.TextButtom}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  
    containerButtom: {
    //   marginTop: 150,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: 200,
      height: 40,
    },
    Buttons: {
      width: 80,
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
   
  });