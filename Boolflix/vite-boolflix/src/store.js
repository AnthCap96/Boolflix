// store.js
import { createStore } from 'vuex';
import axios from 'axios';

export const languageFlagMapping = {
    en: 'us',
    fr: 'fr',
    es: 'es',
    it: 'it',
    de: 'de'
  };

export const API_KEY = 'a1c746a976b3cec0d698d664fba0ac1e';
export const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWM3NDZhOTc2YjNjZWMwZDY5OGQ2NjRmYmEwYWMxZSIsInN1YiI6IjY1ZThjOGM4NjNlNmZiMDE2MjM2NjMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R626mIGA0uCwMlpIvRHrFYrH36LDRpURLt1OAmHvUQE';

export default createStore({
  state: {
    searchTerm: '',
    searchResults: [],
  },
  mutations: {
    updateSearchTerm(state, term) {
      state.searchTerm = term;
    },
    updateSearchResults(state, results) {
      state.searchResults = results;
    },
  },
  actions: {
    async searchMovies({ commit, state }) {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=it_IT&query=${state.searchTerm}`,
          {
            headers: {
              'Authorization': `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        const tvResponse = await axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=it_IT&query=${state.searchTerm}`,
          {
            headers: {
              'Authorization': `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        // Risultati e aggiornamenti del global state
        const movies = movieResponse.data.results;
        const tvShows = tvResponse.data.results;
        const results = [...movies, ...tvShows];
        commit('updateSearchResults', results);
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
      }
    },
  },
});
 
