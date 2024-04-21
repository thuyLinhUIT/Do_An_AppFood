import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  TouchableOpacity, } from 'react-native';
import Linh from './src/screens/Linh'
import axios from 'axios';

export default function App() {

//   const GoiWebApi =async()=>{
//     try {
// const response =await axios.get ('http://192.168.1.198:3000/api/getAll');
// alert(response.data)
//       } 
//       catch (error){
//         alert(error.message);
//       }
//     }

   return (
   
   
<Linh/>
  

   
  // <View style={{ flex: 1, justifyContent: "center" }}>
  //     <TouchableOpacity onPress={GoiWebApi}>
  //           <Text style={{ color: "#f64e32", fontWeight: "700" }}>
  //             {" "}
  //             goi API
  //           </Text>
  //         </TouchableOpacity>
  // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
