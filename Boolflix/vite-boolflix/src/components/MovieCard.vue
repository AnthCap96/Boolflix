<!-- MovieCard.vue -->
<template>
  <div class="movie-card" @mouseover="showDetails = true" @mouseleave="showDetails = false">
    <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" />
    <div v-if="showDetails" class="movie-details">
      <h3>{{ movie.title || movie.name }}</h3>
      <p>{{ movie.original_title || movie.original_name }}</p>
      <span>{{ getFlagImage(movie.original_language) }}</span>
      <div class="rating">
        <span v-for="star in getRatingStars(movie.vote_average)" :key="star" class="stars"><span class="star"></span></span>
          <!-- Implementa stelle -->
        </div>
      </div>
    </div>
</template>

<script>
import { languageFlagMapping } from '../store';

export default {
  props: {
    movie: Object,
  },
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    getMoviePosterUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const size = 'w342';
      return posterPath ? `${baseUrl}${size}/${posterPath}` : '';
    },
    getFlagImage(language) {
      const flagCode =
      languageFlagMapping[language] || 'unknown';
      return flagCode;
    },  
    getRatingStars(rating) {
    const stars = Math.ceil(rating / 2);
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      starsArray.push(i <= stars ? 'full-star' : 'empty-star');
  }
    return starsArray;
    },
  },
};
</script>

<style scoped>
/* Style della card e dettagli*/
.movie-card {
  position: relative;
  overflow: hidden;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  /* Style della card */
}

-movie-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.movie-details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.movie-card:hover .movie-details {
  opacity: 1;
}

.movie-details h3 {
  margin: 0;
  font-size: 1rem;
}

.movie-details span {
  font-size: 1rem;
}

/* Style per le stelle*/
.rating {
  display: flex;
  align-items: center;
}

.stars {
  display: flex;
  color: #FFD700;
}

.star {
  font-size: 1.5rem;
  margin-right: 2px;
}

.full-star::before {
  content: '\2605';
  color: #FFD700;
}

.empty-star::before {
  content: '\2605';
}

</style>