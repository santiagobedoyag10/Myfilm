import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import InfoModal from "../components/InfoModal";
import { isCancel } from "axios";

const UserOpcion = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [imageUrl, setImage] = useState(null)
  const defaultImage = 'https://freesvg.org/img/abstract-user-flat-4.png'
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCancel, setIscancel] = useState(false);

  useEffect(()=>{
        if(user && user.photoURL){
          setImage(user.photoURL)
        } else {
          setImage(defaultImage)
        }
      }, [user])
  

  function HandleLogOut() {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch(() => {
        Alert.alert("Error: No se ha podido cerrar la sesión");
      });
  }

  return (
    <View style={styles.container}>
       <Image source={{uri: imageUrl}} style={styles.profileImage} />
      <Text style={styles.name}>{user?.displayName || "Usuario"}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Ajustes")}>
        <Text style={styles.buttonText}>Cuenta</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Sobre el App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={HandleLogOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <InfoModal visible={isModalVisible} onCancel={()=> setModalVisible(false)}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    justifyContent: "space-between",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000",
  },
  button: {
    backgroundColor: "#900c0c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    alignContent: 'flex-end',
    backgroundColor: "#dd2b2b",
    marginTop: '60%',
    width: "50%"
  },
});

export default UserOpcion;
