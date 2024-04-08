<!-- MovieCard.vue -->
<template>
  <div class="movie-card" @mouseover="showDetails = true" @mouseleave="showDetails = false">
    <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster"  />
    <div v-if="showDetails" class="movie-details"> 
      <h3>{{ movie.title || movie.name }}</h3> 
      <p>{{ movie.original_title || movie.original_name }}</p>
      <img :src="getFlagImage(movie.original_language)" style="width: 40px;">
      <div class="rating">
        <span v-for="star in 5 " :key="star" class="stars"><i :class="getStarsClass(star, movie.vote_average)"></i></span>
          <!-- Implementa stelle -->
      </div>
      <div class="overview" v-if="movie.overview">
                <div class="description">Overview:</div>
                <div>{{ movie.overview }}</div>
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
      return posterPath ? `${baseUrl}${size}/${posterPath}` : 'https://www.malaco.com/wp-content/uploads/2016/06/no-photo-available-black-profile-300x300.jpg';
    },
     getFlagImage(language) {
      const baseUrl = 'https://flagsapi.com/';
      const size = '/flat/64.png';
      return language ? `${baseUrl}${languageFlagMapping[language]}${size}` : '';

     }, 
    getRatingStars(vote_average) {
      const stars = vote_average / 2;
      return Math.ceil(stars)
    },
    getStarsClass(index, voteAverage) {
   if (index <= this.getRatingStars(voteAverage)) {
    return "full-star"
   }
   else {
    return "empty-star"
   }
    ;
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

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.movie-details {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 5px;
  padding-left: 5px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: block;
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
  content: '\2606';
  color: #ccc;
}

.overview {
  font-size: 14px;
  margin-left: 4px;
  max-width: 100%;
}

</style>