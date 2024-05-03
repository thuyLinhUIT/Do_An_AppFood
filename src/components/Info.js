import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Info({ infomation, detail }) {
  const { width, height } = Dimensions.get('window');
  return (
    <View>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: "#666666",
              textAlign: "left",
              marginLeft: 28
            }}
            numberOfLines={1}
          >
            {infomation}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: "#cdcdcd",
              textAlign: "left",
              // zIndex: 23,
              // margin:10,           
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {detail}
          </Text>

        </View>
        {/* <View>
        <TouchableOpacity onPress={onPress}><Ionicons
                name='pencil'
                size={25}
                color='blue'
                boldText                
              /></TouchableOpacity>
        </View> */}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    marginRight: 5,
    paddingVertical: 5,
    paddingLeft: 10,
    marginLeft: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});