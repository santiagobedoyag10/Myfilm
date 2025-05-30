import { and } from "firebase/firestore";
import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Dimensions } from "react-native";

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const UploadTeaser = ({visible, onCancel, movieId, value, onChangeText, onSave}) => {
    return(
        <Modal visible={visible} animationType="slide"  transparent={true} onRequestClose={onCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Subir Teaser</Text>
                    <Text style={styles.modalText}>{"Puedes ayudar a crecer la base de datos de la App aportando la URL del teaser de tu pelicula favorita."}
                    </Text>
                    <Text style={[styles.modalText, {fontWeight: 'bold'}]}>{"(Recuerda es en .mp4)"}
                    </Text>
                    <View style={styles.itemContainer}>
                    <View style={styles.itemContent}>
                    <Text style={[styles.modalText, {fontWeight: 'bold'}]}>ID</Text>
                    </View>
                    <TextInput style={styles.modalInput} editable={false}>{movieId}</TextInput>
                    </View>
                    <View style={styles.itemContainer}>
                    <View style={styles.itemContent}>
                    <Text style={[styles.modalText, {fontWeight: 'bold'}]}>URL</Text>
                    </View>
                    <TextInput style={styles.modalInput} placeholder={`Url`} value={value} onChangeText={onChangeText}/>
                    </View>
                    <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButtonEstile} onPress={onSave}>
                            <Text style={styles.modalButtonText}>Agregar</Text>
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
      width: width * 0.9,
      height: height * 0.43,
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 1,
      padding: 20,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    itemContainer: {
      backgroundColor: 'transparent',
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#000',
    },
    modalText: {
      fontSize: 15,
      fontWeight: '400',
      marginBottom: 2,
      color: '#000',
      textAlign: 'center',
    },
    itemContent: {
      flexDirection: 'column',
      flex: 1,
    },
    modalInput: {
      width: '85%',
      height: height * 0.04,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginLeft: 5,
      marginTop: height * 0.0005,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: height * 0.005,
    },
    modalButtonEstile: {
      marginHorizontal: 3,
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
})

export default UploadTeaser;