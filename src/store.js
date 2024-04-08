// store.js
import { reactive } from 'vue';
import axios from 'axios';

export const languageFlagMapping = {
    en: 'US',
    fr: 'FR', 
    es: 'ES', 
    it: 'IT',
    de: 'DE',
    ja: "JP",
    zh: "CN",
    pt: "PT",
    ru: "RU",
    ar: "SA",
    hi: "IN",
    ko: "KR",
    tr: "TR",
    nl: "NL",
    sv: "SE",
    pl: "PL",
    ka: "GE" 
  };

export const API_KEY = 'a1c746a976b3cec0d698d664fba0ac1e';


export const state = reactive({
  
    searchTerm: '',
    searchResults: [],
    movies: [],
    tvSeries: [],

    getMovies() {
       axios.get (`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it_IT&query=${state.searchTerm}`).then((response)=>{
        state.movies = response.data.results;
        console.log(state.movies);
       });
    },

    getSeries() {
        axios.get (`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=it_IT&query=${state.searchTerm}`).then((response)=>{
         state.tvSeries = response.data.results;
        });
     },
});
 
  