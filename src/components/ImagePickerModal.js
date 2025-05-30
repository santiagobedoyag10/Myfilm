import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Dimensions } from "react-native";

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ImagePickerModal = ({visible, imageUri, onChooseImage, onSave, onCancel}) => {
    return(
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onCancel}>
               <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Cambiar foto de perfil</Text>
                                <Image source={{uri: imageUri}} style={styles.profileImage}/>
                                <View style={styles.modalButtonsImage}>
                                    <TouchableOpacity style={styles.modalButtonEstile} onPress={onChooseImage}>
                                        <Text style={styles.modalButtonText}>Seleccionar Imagen</Text>
                                    </TouchableOpacity>
                                    </View>
                                    <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalButtonEstile} onPress={onSave}>
                                        <Text style={styles.modalButtonText}>Guardar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButtonEstile} onPress={onCancel}>
                                        <Text style={styles.modalButtonText}>Cancelar</Text>
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
      height: height * 0.45,
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 1,
      padding: 15,
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
      width: '100%',
      height: 40,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: height * 0.045,
      marginTop: height * 0.03,
    },
    modalButtonsImage: {
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: width * 1.1,
      marginTop: height * 0.01,
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
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    profileImage: {
      width: width * 0.4,
      height: width * 0.4,
      borderRadius: width * 0.3 / 2,
      marginTop: 20,
      marginBottom: 10,
    },
})

export default ImagePickerModal;
