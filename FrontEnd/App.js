import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  TouchableOpacity, } from 'react-native';
import Linh from './src/screens/Linh'
import AvatarScreen from './src/screens/AvatarScreen';
import axios from 'axios';
import ProfileScreen from './src/screens/ProfileScreen';
import InfoTeamScreen from './src/screens/InfoTeamScreen';

export default function App() {
   return (
    <View style={styles.container}>
<AvatarScreen/>
{/* <ProfileScreen/> */}
{/* <InfoTeamScreen/> */}
    </View> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
