import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const InfoModal = ({visible, onCancel}) => {
    return(
        <Modal visible={visible} animationType="slide"  transparent={true} onRequestClose={onCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>My Film</Text>
                    <Text style={styles.modalInput}>App desarrollada en React Native usando expo, con el objetivo de ser
                        una app streaming funcional y simple de usar.
                    </Text>
                    <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButtonEstile} onPress={onCancel}>
                            <Text style={styles.modalButtonText}>Ok</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
        
            </View>

        </Modal>
    )

}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: height * 0.05,
    },
    modalContent: {
      backgroundColor: '#fff',
      width: width * 0.85,
      height: height * 0.28,
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#000',
    },
    modalInput: {
      textAlign: 'center',
      marginBottom: 20,
      marginTop: height * 0.02,
      paddingHorizontal: 10,
      borderRadius: 5,
      fontSize: 15
    },
    modalButtons: {
      alignItems: 'center',
      width: '100%',
      marginTop: height * 0.005,
      marginBottom: height * 0.08,
    },
    modalButtonEstile: {
      marginHorizontal: 5,
      width: '45%',
      backgroundColor: '#dd2b2b',
      paddingVertical: 10,
      borderRadius: 25,
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    }
})

export default InfoModal;