<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <img src="./img/Boolflix.png">
      <div>
        <input type="text" id="movieSearchInput" v-model="searchTerm" placeholder="Cerca film o serie" />
        <button @click="searchMovies">Cerca</button>
      </div>
    </header>
    <main>
      <movie-card v-for="result in $store.state.searchResults" :key="result.id" :movie="result" />
    </main>
  </div>
</template>

<script>

import MovieCard from './components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    searchMovies() {
      // Gestione della ricerca API
      this.$store.dispatch('searchMovies', this.searchTerm);
    },
  },
};
</script>

<style>
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
