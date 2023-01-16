import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useMoviesStore = defineStore("useMoviesStore", {
  state: () => ({
    movies: [],
    quotes: [],
    edited: false,
    updatedMovie: [],
  }),
  actions: {
    getMovies() {
      axios.get("movies").then((response) => {
        this.movies = response.data;
      });
    },
    deleteMovie(id) {
      axios
        .delete(`movies/${id}`)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
