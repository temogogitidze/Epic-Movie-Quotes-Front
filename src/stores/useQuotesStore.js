import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useQuotesStore = defineStore("useQuotesStore", {
  state: () => ({
    quotes: [],
    quote: [],
    page: 1,
    searchQuery: null,
  }),
  actions: {
    getQuotes() {
      axios.get("quotes?page=" + this.page++).then((response) => {
        this.quotes.push(...response.data.data);
      });
    },
    getQuotesRefresh() {
      axios.post("quotes/refresh", this.quotes.length).then((response) => {
        this.quotes = response.data;
      });
    },
    deleteQuote(id) {
      axios
        .delete(`quotes/${id}`)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    getQuote(id) {
      axios
        .get(`quotes/${id}`)
        .then((response) => {
          this.quote = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
