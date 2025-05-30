import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Image, Dimensions, Text, View, TouchableOpacity, FlatList, Pressable, RefreshControl } from "react-native";
import { getMovie, castMovie } from "../services/Service";
import PlayButton from '../components/PlayButton'
import dateFormat from "dateformat";
import MyList from "../components/MyList";
import { useAuth } from '../context/AuthContext'
import UploadTeaser from "../components/UploadTeaser";
import { showMessage } from 'react-native-flash-message';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardActors from "../components/CardActors";

const placeholderImage = require('../assets/images/placeholder.jpg')
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Detail = ({ route, navigation }) => {
    const { user, setUser } = useAuth()
    const movieId = route.params.movieID;
    const [castMovies, setcastMovies] = useState();
    const [movieDetail, setMovieDatil] = useState();
    const [loaded, setLoaded] = useState(false);
    const [loadedCast, setLoadedCast] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [fieldValue, setFielValue] = useState("")
    const [exists, setExist] = useState(false);    
    const [refresh, setRefresh] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshbutton = () => {
    setRefreshKey(prev => prev + 1);
    };


    const fetchMovieDetails = async () => {
  try {
    const movieData = await getMovie(movieId);
    setMovieDatil(movieData);
    setLoaded(true);
  } catch (error) {
    console.error("Error al obtener los detalles de la película:", error);
  }
};

const fetchCastAndTeaser = async () => {
  try {
    const castData = await castMovie(movieId);
    setcastMovies(castData);
    setLoadedCast(true);

    const db = getFirestore();
    const docRef = doc(db, "Teaser", movieId.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setExist(true);
    } else {
      setExist(false);
    }
  } catch (error) {
    console.error("Error al obtener cast o teaser:", error);
  }
};

   useEffect(() => {
  fetchMovieDetails();
}, [movieId]);

useEffect(() => {
  fetchCastAndTeaser();
}, [movieId]);

    const isValidMp4Url = (url) => {
    const regex = /^https:\/\/.*\.mp4$/i;
    return regex.test(url.trim());
    };

    const handleSave = async () => {
      try{
        if(isValidMp4Url(fieldValue)){
            const db = getFirestore();
        const docRef = doc(db, "Teaser", movieId.toString());
        if (!exists) {
            const datosf = {
            Title: movieDetail.title,
            Uri: fieldValue
        }
        await setDoc(docRef, datosf);
        showMessage({
                    message: 'Éxito',
                    description: 'Teaser subido correctamente.',
                    type: 'success',
                  });
        }else{
            showMessage({
                    message: 'Error',
                    description: 'Teaser ya registrado.',
                    type: 'danger',
                  });
        }
        }
        else{
            showMessage({
                    message: 'Error',
                    description: 'URL no valida.',
                    type: 'danger',
                  });
        }
      }catch(e){
        console.log("Error", e.message)

      }finally{
        setVisibleModal(false)
      }
    }

    const refreshAll = useCallback(async () => {
    setRefresh(true);
    await Promise.all([fetchMovieDetails(), fetchCastAndTeaser(), refreshbutton()]);
    setRefresh(false);
  }, [movieId]);

    return (
        <React.Fragment>
            {loaded && (
                <ScrollView refreshControl={<RefreshControl onRefresh={refreshAll} refreshing={refresh}/>}>
                <View style={styles.container}>
                    <ScrollView>
                        <Image resizeMode='cover'
                            style={styles.image}
                            source={movieDetail.poster_path ? { uri: 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/' + movieDetail.poster_path } : placeholderImage}
                        />
                        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                            <Text style={styles.editButtonText}>Atras</Text>
                        </TouchableOpacity>
                        <View style={styles.containerDetails}>
                            <View style={styles.containerTitle}>
                                <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                            </View>
                            {movieDetail.genres && (
                                <View style={styles.genresContainer}>
                                    {movieDetail.genres.map(genre => {
                                        return (
                                            <View key={genre.id || genre.name} style={styles.genresContainer}>
                                                <Text style={styles.genre}>
                                                    {genre.name}
                                                </Text>
                                            </View>
                                        );
                                    })}

                                </View>
                            )}


                            <View style={styles.genresContainer}>
                                <Text style={styles.genre}>Titulo Original: {movieDetail.original_title}</Text>
                            </View>
                            <View style={styles.container}>
                                <View style={styles.PlayButton}>
                                    <PlayButton navigation={navigation} title={movieDetail.title} id={movieId} refreshKey={refreshKey}/>
                                    <MyList user={user} id={movieId} />
                                    {!exists && (
                                         <Pressable onPress={()=>setVisibleModal(true)} style={styles.button}>
                                                <Icon name="add-to-queue" size={60} color={'black'} />
                                        </Pressable>
                                    )}
                                </View>
                                <View style={styles.PlayButton}>
                                </View>
                            </View>
                            <View style={styles.containerOverview}>
                                <Text style={styles.overview}>
                                    {movieDetail.overview ? movieDetail.overview : "No hay sinopsis disponible"}
                                </Text>
                            </View>
                            <Text style={styles.release}>{'Fecha de estreno: ' + dateFormat(movieDetail.release_date, 'dd/mm/yyyy')}</Text>

                            <Text style={styles.elenco}>Reparto principal</Text>
                            {castMovies && (
                                <FlatList data={castMovies}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <CardActors item={item} />
                                    )}
                                    contentContainerStyle={{ paddingHorizontal: 3, paddingVertical: 5 }}
                                />
                            )}
                        </View>
                    </ScrollView>
                    <UploadTeaser visible={visibleModal} onCancel={()=> setVisibleModal(false)} movieId={movieId}
                    onChangeText={setFielValue} 
                    onSave={handleSave}
                        />
                </View>
                </ScrollView>
            )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 20,
        backgroundColor: '#ffffff',
        marginBottom: '3%'
    },
    containerDetails: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: -1,
        textAlign: 'center',
        width: 'auto',
        marginTop: 'auto',
        paddingLeft: 'auto',
        flexDirection: 'column'
    },

    containerTitle: {
        flexDirection: 'row',
        position: 'relative',
        flexWrap: 'wrap',
        margin: '5%'
    },

    containerOverview: {
        width: width / 1.02,
    },
    image: {
        height: height / 1.5,
        width: width / 1
    },
    movieTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 2,
        textAlign: 'center',
    },
    genresContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginVertical: '3%',
        textAlign: 'center',
        flexWrap: 'wrap',
        paddingStart: '3%',
    },

    genresContainerScroll: {
        marginHorizontal: 15
    },
    genre: {
        marginRight: 10,
        fontWeight: 'bold',
        width: 'auto',
    },

    elenco: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        width: '50%',
        marginBlockEnd: '5%'
    },
    overview: {
        marginHorizontal: 15,
        fontSize: 14.5,
        textAlign: 'center',
        marginBottom: 15,
    },
    release: {
        fontWeight: 'bold',
        paddingBlockEnd: 20
    },

    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PlayButton: {
        position: 'static',
        flexDirection: 'row'
    },
    backButton: {
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#dd2b2b',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: '12%',
        marginLeft: '3%'
    },
    button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
    editButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    }

})

export default Detail;