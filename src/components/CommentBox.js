import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");
export default function CommentBox({ value, onPress, handleText, }) {
    return (
        <View style={styles.container}>
            {/* <Text>CommentBox</Text> */}
            <TextInput
                style={styles.Text}
                multiline={true}
                value={value}
                placeholder='Viết bình luận công khai...'
                onChangeText={(text) => handleText(text)} />
            <View style={styles.Touch}>
                <TouchableOpacity onPress={onPress}>
                    <Ionicons name='send' size={20} color='#27CFF1' />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width - 5,
        marginVertical:5,
    },
    Touch: {
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 8
    },
    Text: {
        backgroundColor: '#E8E7E0',
        marginHorizontal: 5,
        borderRadius: 10,
        padding: 5
    },

});