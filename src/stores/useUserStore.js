import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
const backendUrl = import.meta.env.VITE_API_THUMBNAIL_URL;

export const useUserStore = defineStore("user", {
  state: () => ({
    user: [],
    userThumbnail: "",
  }),
  actions: {
    getUser() {
      axios.get("user").then((response) => {
        this.user = response.data.user;
        if (!response.data.user.thumbnail) {
          this.userThumbnail =
            "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        } else {
          this.userThumbnail = backendUrl + response.data.user.thumbnail;
        }
      });
    },
  },
});
