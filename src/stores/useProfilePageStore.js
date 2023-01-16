import { defineStore } from "pinia";

export const useProfilePageStore = defineStore("useProfilePageStore", {
  state: () => ({
    showForm: true,
    showSuccessfullEditModal: false,
    usernameEdited: false,
    passwordEdited: false,
  }),
  actions: {
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
    toggleShowModal(value) {
      this.showSuccessfullEditModal = value;
    },
    toggleUsernameEdited(value) {
      this.usernameEdited = value;
    },
    togglePasswordEdited(value) {
      this.passwordEdited = value;
    },
  },
});
