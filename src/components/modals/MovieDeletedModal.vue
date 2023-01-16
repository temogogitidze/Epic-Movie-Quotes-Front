<template>
  <crud-modal
    @click="store.toggleMovieDeletedModal(false)"
    :showModal="store.showMovieDeletedModal"
  >
    <template v-slot:header>
      <div
        class="absolute left-3 grid grid-cols-2 divide-x items-center bg-transparent py-2 px-5 rounded"
      ></div>
      {{ $t("quote_deleted_successfully") }}
      <div
        @click="store.toggleMovieDeletedModal(false)"
        class="absolute right-10 top-7"
      >
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <section class="items-center text-center my-5">
        <p class="text-green-600 mb-5">
          {{ $t("movie_deleted_successfully") }} !
        </p>
        <button class="text-center bg-red-600 p-2" @click="goBack()">
          {{ $t("go_back") }}
        </button>
      </section>
    </template>
  </crud-modal>
</template>

<script setup>
import CrudModal from "@/components/ui/CrudModal.vue";
import CloseIcon from "@/components/ui/icons/CloseIcon.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import { useRouter } from "vue-router";

const store = useModalStore();

const router = useRouter();

function goBack() {
  store.toggleMovieDeletedModal();
  router.push({ name: "list-of-movies" });
}
</script>
