import React, {useEffect, useState, useRef} from "react";
import { View, StyleSheet, FlatList, Dimensions, RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import {getPopularMovies, getTopMovies, getTopTV, getAccionMovies, getComedyMovies, getFamilyMovies, getCienceFictionMovies, castMovie} from '../services/Service'
import CardCarrusel from "../components/CardCarrusel";
import List from '../components/List'

const { width } = Dimensions.get("screen");

const Home = ({navigation}) =>{
  

  const flatListRef = useRef(null); 
  const [moviesImages, setMoviesImages]= useState([])
  const [popularMovies, setPopularMovies]= useState()
  const [castMovies, setCastMovies]= useState()
  const [upcomingMovies, setUpcomingMovies]= useState()
  const [accionMovies, setAccionMovies] = useState()
  const [comedyMovies, setComedyMovies] = useState()
  const [FamilyMovies, setFamilyMovies] = useState()
  const [CienceFictionMovies, setCienceFictionMovies] = useState()
  const [error, setError]= useState(false)
  const [refresh, setRefresh] = useState(false);

  const getData = () => {
    return Promise.all([getPopularMovies(), getTopMovies(), getAccionMovies(), getComedyMovies(), getFamilyMovies(),getCienceFictionMovies()])
  }

  useEffect(() => {
    getData().then(([upcomingMoviesData, popularMoviesData, accionMoviesData, comedyMoviesData, familyMoviesData, CienceFictionMoviesData]) =>{
      const moviesImagesArray = []
      upcomingMoviesData.forEach(movies => {
        moviesImagesArray.push('https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movies.poster_path)
      });
      setUpcomingMovies(upcomingMoviesData);
      setMoviesImages(moviesImagesArray);
      setPopularMovies(popularMoviesData);
      setAccionMovies(accionMoviesData);
      setComedyMovies(comedyMoviesData);
      setFamilyMovies(familyMoviesData);
      setCienceFictionMovies(CienceFictionMoviesData);

    })
    .catch(() => {
      setError(true)
    })

    .finally(() =>{
      setLoaded(true)
    })
  }, [])

  const refrescar = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false)
      getData()
    }, 2000)
  }

return (
    <ScrollView refreshControl={<RefreshControl onRefresh={refrescar} refreshing={refresh}/>}>
    <View style={styles.container}>
    <FlatList
        ref={flatListRef}
        data={upcomingMovies}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
       renderItem={({item}) => (
                     <CardCarrusel navigation={navigation} item={item} />
                   )}
                   keyExtractor={item => item.id}
                   />
      </View>
      <View style={styles.container}>
      {popularMovies && ( <View style={styles.carousel}>
        <List
        navigation={navigation}
        title={'Peliculas del momento'}
        content={popularMovies}/>
      </View>)}
      </View>
      <View style={styles.container}>
      {accionMovies && ( <View style={styles.carousel}>
        <List
        navigation={navigation}
        title={'Peliculas de Acción'}
        content={accionMovies}/>
      </View>)}
    </View>
    <View style={styles.container}>
      {comedyMovies && ( <View style={styles.carousel}>
        <List
        navigation={navigation}
        title={'Peliculas de Comedia'}
        content={comedyMovies}/>
      </View>)}
    </View>
    <View style={styles.container}>
      {FamilyMovies && ( <View style={styles.carousel}>
        <List
        navigation={navigation}
        title={'Peliculas para toda la Familia'}
        content={FamilyMovies}/>
      </View>)}
    </View>
    <View style={styles.container}>
      {CienceFictionMovies && ( <View style={styles.carousel}>
        <List
        navigation={navigation}
        title={'Peliculas de Ciencia Ficción'}
        content={CienceFictionMovies}/>
      </View>)}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width, 
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 500, 
    borderRadius: 15,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerbutoon: {
    justifyContent: 'space-between',
    padding: 5,
    position: 'absolute',
    alignItems: 'center',
    height: 30,
    width: 130,
    backgroundColor: 'red',
    borderRadius: 8,
    
  },
});

export default Home;
