import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Image, Dimensions, Text, View, TouchableOpacity, FlatList } from "react-native";
import { getMovie, castMovie } from "../services/Service";
import PlayButton from '../components/PlayButton'
import dateFormat from "dateformat";
import MyList from "../components/MyList";
import { useAuth } from '../context/AuthContext'
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


    useEffect(() => {
        getMovie(movieId).then(movieData => {
            setMovieDatil(movieData);
            setLoaded(true)
        })
    }, [movieId])

    useEffect(() => {
        castMovie(movieId).then(castData => {
            setcastMovies(castData);
            setLoadedCast(true)
        })
    }, [movieId])

    return (
        <React.Fragment>
            {loaded && (
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
                                    <PlayButton navigation={navigation} title={movieDetail.title} id={movieId} />
                                    <MyList user={user} id={movieId} />
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
                </View>
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
        backgroundColor: '#ffffff'
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

    editButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    }

})

export default Detail;