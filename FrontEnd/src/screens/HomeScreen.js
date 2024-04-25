// HomeScreen.js
import React ,{useState}from 'react';
import { View, Text, StyleSheet,Button,Modal } from 'react-native';

const HomeScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My Awesome App!</Text>
            <Text style={styles.subtitle}>This is the Home Screen.</Text>

            {/* <View style={styles.containerModal}>
      <Button title="Show Pop-up" onPress={toggleModal} />

      <Modal isVisible={isModalVisible} backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <Text>Hello, this is a custom pop-up!</Text>
          <Button title="Hide Pop-up" onPress={toggleModal} />
        </View>
      </Modal>
    </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
});

export default HomeScreen;
