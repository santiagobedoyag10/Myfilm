import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search"
import User from "../screens/UsersOpcion"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import Detail from "../screens/Detail";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Registrer";
import FavoriteList from "../screens/FavoriteList";
import Settings from "../screens/auth/Settings";
import VideoPlayerComponent from "../components/VideoPlayerComponent";
import Notification from "../screens/Notification";
const Tab=createBottomTabNavigator();
const Stack=createNativeStackNavigator();

const TabNavigator = () =>{
    return(
      <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
    
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Mi Cuenta") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Buscar") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Mi Lista") {
            iconName = focused ? "list" : "list-sharp";
          } else if (route.name=== "Notificaciones"){
            iconName = focused ? "notifications" : "notifications-outline"
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f33333",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: { backgroundColor: "#fff" }
      })}
    >
    
            <Tab.Screen name="Home" component={Home} options={{}}/>
            <Tab.Screen name="Buscar" component={Search} options={{}}/>
            <Tab.Screen name="Mi Lista" component={FavoriteList} options={{}}/>
            <Tab.Screen name="Notificaciones" component={Notification} options={{}}/>
            <Tab.Screen name="Mi Cuenta" component={User} options={{}}/>
        </Tab.Navigator>
    )
}

const MainNavigation = () => {
  //AGREGAR REGISTER
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Detail" component={Detail} options={{headerShown: false}}/>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="Ajustes" component={Settings} options={{headerShown: false}}/>
        <Stack.Screen name="Player" component={VideoPlayerComponent} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default MainNavigation