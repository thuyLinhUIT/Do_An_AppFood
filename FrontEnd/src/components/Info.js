import { View, Text,Dimensions } from 'react-native'
import React from 'react'

export default function Info({infomation,detail}) {
    const {width,height} =Dimensions.get('window');
  return (
    <View>
        <View style={{ flexDirection:'row', justifyContent:'space-between', width, alignItems:'center'}}>
          <Text
            style={{             
              fontSize: 20,
              fontWeight: "400",            
              color: "#666666",           
              textAlign: "left",
              marginLeft:20           
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
              zIndex: 23,
              margin:10,           
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
           {detail}
          </Text>
        </View>
    </View>
  )
}