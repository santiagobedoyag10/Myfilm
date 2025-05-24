import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, View, StyleSheet, Dimensions, ScrollView, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPopularMovies, searchMovie } from '../services/Service'
import { FlatList } from "react-native";
import Card from "../components/Card";

const Search = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState()
  const [busqueda, setBusqueda] = useState("")
  const [resultSearch, setResultSearch] = useState([])
  const debounceTimeout = useRef(null);

  const getData = () => {
    return Promise.all([getPopularMovies()])
  }

  useEffect(() => {
    getData().then(([popularMoviesData]) => {
      setPopularMovies(popularMoviesData);
    })
      .catch(() => {
        setError(true)
      })

      .finally(() => {
        setLoaded(true)
      })
  }, [])


  const handleSearch = (text) => {
    setBusqueda(text);
  
    // LimpiaF el timeput anterior
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  

    debounceTimeout.current = setTimeout(async () => {
      if (text) {
        try {
          const searchResults = await searchMovie(text);
          setResultSearch(searchResults);
          setLoaded(true);
        } catch (err) {
          setError(true);
          setLoaded(true);
        }
      } else {
        setResultSearch([]);
      }
    }, 500);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar película..."
          placeholderTextColor="#888"
          onChangeText={handleSearch}
          value={busqueda}
        />
      </View>
      <View style={styles.container}>
        {popularMovies && busqueda === "" && (<View style={styles.carousel}>
          <FlatList
            numColumns={3}
            data={popularMovies}
            renderItem={({ item }) => (
              <Card navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
        </View>)}

        {resultSearch && busqueda !== ""&&(
          <View style={styles.carousel}>
            <FlatList
              numColumns={3}
              data={resultSearch}
              renderItem={({ item }) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )
        }
        {
          !popularMovies && (
            <View>
              <Text>NO SE ENCUENTRAN PELICULAS POPULARES</Text>
            </View>
          )
        }

      </View>
      {resultSearch.length == 0 && busqueda !=="" &&(
            <View style={styles.container}>
            <Text>NO SE ENCUENTRA EL TITULO INGRESADO</Text>
          </View>
          )
        }
    </View>
  );
}

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
    paddingLeft: 10,
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

export default Search;