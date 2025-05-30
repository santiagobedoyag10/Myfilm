import React, { useEffect } from "react";
import MainNavigation from "./src/navigate/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import FlashMessage from "react-native-flash-message";
 

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <MainNavigation/>
      <FlashMessage position="top"/>
    </NavigationContainer>
    </AuthProvider>
  );
}
