
import axios from 'axios';
//const axios = require('axios');
const url="https://api.themoviedb.org/3";
const Tk= process.env.EXPO_PUBLIC_TOKEN_MOVIES

// PETICIONES - OBTENER MOVIE
export const getMovie = async (id) => {
    const rest = await axios.get(`${url}/movie/${id}`,
    {
    headers: {
        accept : "application/json",
        Authorization : `Bearer ${Tk}`
    },

    params: {
        language: "es-MX"
    }
})

return rest.data;

}

export const getPopularMovies = async () => {
    const rest = await axios.get(`${url}/movie/popular?language=es-MX`,
        {
        headers: {
            accept : "application/json",
            Authorization : `Bearer ${Tk}`
        }
    })
    return rest.data.results;
}

export const getTopMovies = async () => {
    const rest = await axios.get(`${url}/trending/movie/day?language=es-CO`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.results;
}

export const getTopTV = async () => {
    const rest = await axios.get(`${url}/trending/tv/day?language=es-CO`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.results;
}

export const getAccionMovies = async () => {
    const rest = await axios.get(`${url}/discover/movie?with_genres=28?language=es-CO`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.results;
}

export const getComedyMovies = async () => {
    const rest = await axios.get(`${url}/discover/movie?with_genres=35?language=es-CO`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.results;
}

export const getFamilyMovies = async () => {
    const rest = await axios.get(`${url}/discover/movie?with_genres=10751?language=es-AR`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.results;
}

export const getCienceFictionMovies = async () => {
    const rest = await axios.get(`${url}/discover/movie?with_genres=878?language=es-MX`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.results;
}

export const searchMovie = async (keyword) => {
    const rest = await axios.get(`${url}/search/movie?query=${keyword}`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.results;
}

export const castMovie = async (keyword) => {
    const rest = await axios.get(`${url}/movie/${keyword}/credits?language=es-MX`, 
        {
            headers: {
                accept : "application/json",
                Authorization : `Bearer ${Tk}`
            }
        }
    )
    return rest.data.cast;
}