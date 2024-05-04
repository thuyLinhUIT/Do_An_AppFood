import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CardInfoDev = ({name,bietdanh,chucvu,congviec,avatar,mssv}) => { 
  return (
    <SafeAreaView>
    <View style={styles.cardContainer}>
      {/* Hình ảnh bên trái */}

      <Image
        source={{ uri: avatar}}
        style={styles.image}

      />
      {/* Thông tin bên phải */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Tên: {name}</Text>
        <Text style={styles.name}>MSSV: {mssv}</Text>
        <Text style={styles.text}>Biệt danh: {bietdanh}</Text>
        <Text style={styles.text}>Chức vụ: {chucvu}</Text>
        <Text style={styles.text}>Công việc: {congviec}</Text> 
             </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 5,
    // paddingVertical:10,
    marginBottom:7,
    backgroundColor: '#FDDFBF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center', // Để icon nằm giữa khung viền
    alignItems: 'center', 
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
   
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },

});

export default CardInfoDev;