import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { getMovie } from "../services/Service";
import Card from "../components/Card";

const FavoriteList = ({ navigation }) => {
  const { user } = useAuth();
  const db = getFirestore();

  const [lista, setLista] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const docRef = doc(db, "Lists", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        const movieList = Array.isArray(data.Movies)
          ? data.Movies.filter((m) => m !== "")
          : [];

        if (movieList.length === 0) {
          setLista([]);
          setData([]);
          return;
        }

        setLista(movieList);

        const movieData = await Promise.all(movieList.map((id) => getMovie(id)));
        setData(movieData);
      } else {
        Alert.alert("Lista no encontrada", "No se encontraron datos para este usuario.");
      }
    } catch (error) {
      console.log("Error al consultar Firestore:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading && lista.length === 0 && (
        <View>
          <Text>No se han agregado películas a la lista.</Text>
        </View>
      )}

      {!isLoading && lista.length > 0 && (
        <View style={styles.carousel}>
          <FlatList
            data={data}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card navigation={navigation} item={item} />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",

  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
    height: "100%",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",

  },
});

export default FavoriteList;
