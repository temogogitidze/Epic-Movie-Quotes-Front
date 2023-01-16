import { defineStore } from "pinia";

export const useForgotPasswordStore = defineStore("useForgotPassword", {
  state: () => ({
    email: "",
  }),
  actions: {
    setEmail(email) {
      this.email = email;
    },
  },
});
