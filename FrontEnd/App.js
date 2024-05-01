import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  TouchableOpacity, } from 'react-native';
import Linh from './src/screens/Linh'

import axios from 'axios';
// import Example from './src/screens/Example';

export default function App() {
   return (
//     <View style={styles.container}>
// {/* <AvatarScreen/> */}
// {/* <ProfileScreen/> */}
// {/* <InfoTeamScreen/> */}
// <Example/>
//     </View> 
<Linh/>
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
