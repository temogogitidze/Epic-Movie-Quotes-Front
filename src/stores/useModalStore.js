import { defineStore } from "pinia";

export const useModalStore = defineStore("useModalStore", {
  state: () => ({
    showRegisterModal: false,
    showLoginModal: false,
    showAddMoviesModal: false,
    showAddQuotesModal: false,
    showAddQuoteFromMoviesModal: false,
    showEditMovieModal: false,
    showEditQuoteModal: false,
    showViewQuoteModal: false,
    showQuoteDeletedModal: false,
    showMovieDeletedModal: false,
    showQuoteAddedModal: false,
    showMovieAddedModal: false,
    showCommentAddedModal: false,
  }),
  actions: {
    toggleRegisterModal() {
      this.showRegisterModal = !this.showRegisterModal;
    },
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal;
    },
    toggleAddMoviesModal() {
      this.showAddMoviesModal = !this.showAddMoviesModal;
    },
    toggleAddQuotesModal() {
      this.showAddQuotesModal = !this.showAddQuotesModal;
    },
    toggleAddQuoteFromMovie() {
      this.showAddQuoteFromMoviesModal = !this.showAddQuoteFromMoviesModal;
    },
    toggleEditModal() {
      this.showEditMovieModal = !this.showEditMovieModal;
    },
    toggleEditQuoteModal() {
      this.showEditQuoteModal = !this.showEditQuoteModal;
    },
    toggleViewQuoteModal() {
      this.showViewQuoteModal = !this.showViewQuoteModal;
    },
    toggleQuoteDeletedModal() {
      this.showQuoteDeletedModal = !this.showQuoteDeletedModal;
    },
    toggleMovieDeletedModal() {
      this.showMovieDeletedModal = !this.showMovieDeletedModal;
    },
    toggleQuoteAddedModal() {
      this.showQuoteAddedModal = !this.showQuoteAddedModal;
    },
    toggleMovieAddedModal() {
      this.showMovieAddedModal = !this.showMovieAddedModal;
    },
    toggleCommentAddedModal() {
      this.showCommentAddedModal = !this.showCommentAddedModal;
    },
  },
});
