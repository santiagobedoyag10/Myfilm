import React, {useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";


const Splash = () => {
    const navigation= useNavigation();

    useEffect(() => {
        const timer= setTimeout(() => {
            navigation.replace("Login")
        },2000); return () => clearTimeout(timer);
    }, [navigation])
    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/images/Logo.png")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
        resizeMode: 'cover',
    },
  });

export default Splash