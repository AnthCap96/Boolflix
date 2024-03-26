<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <img src="./img/Boolflix.png">
      <div>
        <input type="text" id="movieSearchInput" v-model="state.searchTerm" placeholder="Cerca film o serie" />
        <button @click="searchMovies">Cerca</button>
      </div>
    </header>
    <main>
      <h2>Movies</h2>
      <movie-card v-for="result in state.movies" :key="result.id" :movie="result" />
      <h2>Series</h2>
      <movie-card v-for="result in state.tvSeries" :key="result.id" :movie="result" />
    </main>
  </div>
</template>

<script>
import { state } from './store.js';
import MovieCard from './components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      state,
    };
  },
  methods: {
    searchMovies() {
      state.getMovies();
      state.getSeries();     
    },
  },
}
</script>

<style>
/* Background*/
html, body {
  margin: 0;
  padding: 0;
  background-color: black;
  height: 100%;
}

#app {
  min-height: 100vh;
}

/* Style Header*/
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
}

/* Style search bar*/
input {
  padding: 8px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

/* Style Main*/
main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

</style>

