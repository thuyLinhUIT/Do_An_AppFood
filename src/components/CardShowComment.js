import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

const CardShowComment = ({ name, dateUp, content, avatar }) => {

    return (
        <View style={styles.cardContainer}>
         
            <View>
            <View style={styles.InfoUser}>
                {/* Hình ảnh bên trái */}
                <Image
                    source={{ uri: avatar }}
                    style={styles.image}

                />
                {/* Thông tin bên phải */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{dateUp}</Text>                    
                </View>
                
            </View>
            <View>
            <Text style={styles.text}>{content}</Text>
            </View>
            </View>            
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        // flexDirection: 'row',
        padding: 5,
        backgroundColor: '#E7EDED',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        // justifyContent: 'center', // Để icon nằm giữa khung viền
        // alignItems: 'center',
        alignSelf:'center',
        width: width - 10,
        margin:2
    },
    cardContainer1: {
        backgroundColor: '#FDDFBF',
        // justifyContent: 'center', // Để icon nằm giữa khung viền
        // alignItems: 'center',
        width: width - 10,
    },
    InfoUser:{
        flexDirection: 'row',
        justifyContent: 'center', // Để icon nằm giữa khung viền
        alignItems: 'center',
    
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 10,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        paddingLeft: 35
    },
    date: {
        fontSize: 14,
        opacity:0.7       
    },

});

export default CardShowComment;