import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const EditModal = ({visible, title, value, onChangeText, onSave, onCancel}) => {
    return(
        <Modal visible={visible} animationType="slide"  transparent={true} onRequestClose={onCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    {title==="Contraseña" && (
                        <TextInput style={styles.modalInput} placeholder={`Nuevo ${title.toLowerCase()}`} value={value} onChangeText={onChangeText} secureTextEntry/>
                    )}
                    {title!=="Contraseña" && (
                         <TextInput style={styles.modalInput} placeholder={`Nuevo ${title.toLowerCase()}`} value={value} onChangeText={onChangeText}/>
                    )}
                    <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButtonEstile} onPress={onSave}>
                            <Text style={styles.modalButtonText}>Confirmar</Text>
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
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        width: width * 0.8,
        height: height * 0.25,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    modalButtonEstile: {
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
    }
});


export default EditModal;