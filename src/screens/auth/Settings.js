import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../services/firebaseConfig';
import { Dimensions } from 'react-native';
import EditModal from '../../components/EditModal';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import ImagePickerModal from '../../components/ImagePickerModal';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Settings = () => {
    const {user, setUser} = useAuth()
    const [isModalVisible, setModalVisible] = useState(false);
    const defaultImage = 'https://freesvg.org/img/abstract-user-flat-4.png'
    const [ModalTitle, setModalTitle] = useState("")
    const [fieldValue, setFielValue] = useState("")
    const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDDINARYURL
    const UPLOAD_PRESET = process.env.EXPO_PUBLIC_UPLOAD_PRESET
    const [isImageModalVisible, setImageModalVisible] = useState(false)
    const navigation = useNavigation()
    const [imageUri, setImageUri] = useState(null)
    const handleEdit = (field) => {
      setModalTitle(field)
      if(field==="Foto de perfil"){
        setImageModalVisible(true)
      }
      else{
        setFielValue(field === 'Nombre' ? user?.displayName || '' : field === 'Correo' ? user?.email || '' : field === "Contraseña" ? '' : '')
        setModalVisible(true)
    }
      }

    const HandleBack = () => {
      navigation.goBack()
    }
    
    useEffect(()=>{
      if(user && user.photoURL){
        setImageUri(user.photoURL)
      } else {
        setImageUri(defaultImage)
      }
    }, [user])


    const uploadImage = async () => {
      if (!user || !imageUri) {
        console.error('Usuario o URI de imagen no válidos:', { user, imageUri });
        return;
      }
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
        formData.append('upload_preset', UPLOAD_PRESET);
   
        const response = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData,
        });
   
        const data = await response.json();
   
        if (data.secure_url) {
          await updateProfile(auth.currentUser, { photoURL: data.secure_url });
          setUser({ ...user, photoURL: data.secure_url });
          setImageUri(data.secure_url);
          showMessage({
            message: 'Éxito',
            description: 'Foto de perfil actualizada correctamente.',
            type: 'success',
          });
        } else {
          throw new Error(data.error?.message || 'No se pudo obtener la URL de la imagen subida');
        }
      } catch (error) {
        console.error('Error subiendo la imagen:', error);
        showMessage({
          message: 'Error',
          description: error.message,
          type: 'danger',
        });
      } finally {
        setImageModalVisible(false);
      }
    };
    const handleChooseImage = async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
   
        if (status !== 'granted') {
          showMessage({
            message: 'Permiso denegado',
            description: 'Se necesita permiso para acceder a la galería.',
            type: 'danger',
          });
          return;
        }
   
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
   
        if (result.canceled) {
          showMessage({
            message: 'Cancelado',
            description: 'No se seleccionó ninguna imagen.',
            type: 'info',
          });
          return;
        }
   
        setImageUri(result.assets[0].uri);
      } catch (error) {
        console.error('Error seleccionando la imagen:', error);
        showMessage({
          message: 'Error',
          description: 'Ocurrió un error al intentar seleccionar la imagen.',
          type: 'danger',
        });
      }
    };

    const handleSave = async () => {
      try{
        if (ModalTitle === 'Nombre'){
          await updateProfile(auth.currentUser, {displayName: fieldValue})
          showMessage({
            message: '¡Exito!',
            description: 'Nombre actualizado correctamente',
            type: 'success'
          })
        }
        else if (ModalTitle === 'Correo'){
          await updateEmail(auth.currentUser, fieldValue)
          showMessage({
            message: '¡Exito!',
            description: 'Correo actualizado correctamente',
            type: 'success'
          })
    }
    else if (ModalTitle === 'Contraseña'){
      await updatePassword(auth.currentUser, fieldValue)
      showMessage({
        message: '¡Exito!',
        description: 'Contraseña actualizada correctamente',
        type: 'success'
      })
    }
    else if (ModalTitle === "Foto de perfil"){
      await uploadImage();
    }
      }catch(error){
        showMessage({
          message: 'Fail',
          description: error.message,
          type: 'danger'
        })
      }finally {
        setModalVisible(false)
      }
  }
  
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={HandleBack}>
      <Text style={styles.editButtonText}>Atras</Text>
    </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.Titulo}>Ajustes de la cuenta</Text>
      </View>
      <View style={styles.profileSection}>
          <Text style={styles.itemLabel}>Foto de perfil</Text>
          <Image source={{uri: imageUri || defaultImage}} style={styles.profileImage}/>
            <TouchableOpacity style={styles.editButton} onPress={()=>handleEdit("Foto de perfil")}>
              <Text style={styles.editButtonText}>Cambiar</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemLabel}>Nombre</Text>
          <Text style={styles.itemText}>{user?.displayName || 'None'}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => { handleEdit("Nombre") }}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemLabel}>Correo</Text>
          <View style={styles.Value}>
          <Text style={styles.itemText}>{user?.email || 'None'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => { handleEdit("Correo") }}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemLabel}>Contraseña</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => {handleEdit("Contraseña"); }}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <EditModal visible={isModalVisible} title={ModalTitle} value={fieldValue} 
      onChangeText={setFielValue} 
      onSave={handleSave}
      onCancel={()=> setModalVisible(false)}
      />
      <ImagePickerModal
      visible={isImageModalVisible}
      imageUri={imageUri}
      onChooseImage={handleChooseImage}
      onSave={uploadImage}
      onCancel={()=> setImageModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        backgroundColor: '#fff',
        width: width,
        height: height
      },
      titleContainer: {
        alignItems: 'center',
        marginBottom: 2,
        paddingVertical: 'auto',
      },
      profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
      },
      Titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: '10%'
      },
      itemContainer: {
        backgroundColor: 'transparent',
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      itemContent: {
        flexDirection: 'column',
      },
      itemLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
      },
      itemText: {
        fontSize: 16,
        color: '#000',
        marginTop: 2,
      },
      editButton: {
        backgroundColor: '#dd2b2b',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
      },
      editButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
      },

      profileSection: {
        alignItems: 'center',
        marginBottom: 20,
      },

      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dd2b2b',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: '10%',
      },
}
);

export default Settings;