import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import colors from '../../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome6'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../services/firebaseConfig'
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('screen');

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, user, password).then(
            (userCredential) => {
                setError(false)
                setErrorMessage("")
                navigation.navigate("MainTabs")
            }
        ).catch((error)=>{
            setError(true);
            if(error.message=="Firebase: Error (auth/invalid-credential)." || error.message=="Firebase: Error (auth/invalid-login-credentials)."){
                setErrorMessage("Usuario y/o contraseña incorrecto.")
            }
            else{
                setErrorMessage("Se ha presentado un error")
                console.log(error.message)
            }
            
        })
    }

    const handleChangeUser = (text) => {
        setUser(text);
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
        setErrorMessage(isValid ? 'true' : 'Formato de correo inválido');
        setError(isValid ? false : true)
      };
    
      const handleChangePassword = (text) => {
        setPassword(text);
        const isValid = text.length >= 6;
        setErrorMessage(isValid ? 'true' : 'Formato de contraseña invalido');
        setError(isValid ? false : true)
      };

    const navigation= useNavigation();
    return(
        <View>
            <View style={styles.container}>
                <Image source={require('../../assets/images/Logo.png')} style={styles.logo}/>
                </View>
                <View style={styles.containertitulo}>
            <Text style={styles.Titulo}>Iniciar Sesión</Text>
                </View>
                <View style={styles.container}>
            <View style={styles.containerinput}>
                    <Icon2 name="email" size={15} style={styles.icon}/>
                <TextInput style={styles.input} placeholder="Email" value={user} onChangeText={handleChangeUser}/>
                </View>
                {errorMessage=="Formato de correo inválido" && (
                    <Text style={styles.errorText}>Formato correo Invalido</Text>
                )}
            <View style={styles.containerinput}>
                    <Icon name="lock" size={14} style={styles.icon}/>
                <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={handleChangePassword}/>
                </View>
                {errorMessage=="Formato de contraseña invalido" && (
                    <Text style={styles.errorText}>La contraseña debe tener minimo 6 caracteres</Text>
                )}
                </View>
                {error && (
                <View style={styles.container}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
            )}
            <View style={styles.containerbuttonlogin}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerlogin}>
                <TouchableOpacity style={styles.errorText} onPress={() => navigation.navigate('Register')}>
                    <Text>¿No se encuentra registrado?</Text>
                    <Text style={styles.loginText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 'auto',
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: height * 0.02,
        backgroundColor: '#f0f0f0',
    },
    logo: {
        width: width * 0.8,
        height: height * 0.20,
        resizeMode: 'contain',
        marginBottom: height * -0.02,
    },
    containertitulo: {
        alignItems: "center",
        marginBottom: height * 0.05,
    },
    Titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    containerinput: {
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 25,
        marginBottom: height * 0.03,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#000',
        width: width * 0.8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    icon: {
        marginRight: 10,
        color: '#000',
    },
    errorText: {
        color: 'red'
    },
    loginButton: {
        backgroundColor: '#dd2b2b',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: height * 0.05,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    loginText: {
        color: '#dd2b2b',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    containerlogin: {
        position: 'absolute',
        top: '95%',
        alignSelf: 'center',
        flex: 'auto',
        alignItems: "center",
        justifyContent: 'flex-end',
        paddingTop: height * 0.25,
    },

    containerbuttonlogin: {
        flex: 'auto',
        alignItems: "center",
        padding: -100,
        justifyContent: 'flex-end',
        backgroundColor: '#f0f0f0',
    },
})
export default Login