<template>
  <crud-modal
    @click="store.toggleAddMoviesModal(false)"
    :showModal="store.showAddMoviesModal"
  >
    <template v-slot:header
      >{{ $t("add_movie") }}
      <div
        @click="store.toggleAddMoviesModal(false)"
        class="absolute right-10 top-7"
      >
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <Form @submit="onSubmit">
        <section class="flex-col py-5">
          <div class="flex items-center">
            <img
              :src="userThumbnail"
              class="h-[40px] lg:h-[50px] rounded-full max-w-[60px]"
            />
            <p class="ml-5">{{ user.username }}</p>
          </div>
          <section class="mt-5">
            <CrudInput
              lang="en"
              name="nameEn"
              rules="required|en"
              placeholder="Movie name"
            />
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <CrudInput
              lang="ka"
              name="nameKa"
              rules="required|geo"
              placeholder="ფილმის სახელი"
            />
            <GenreInput name="genre" :values="array" />
            <CrudInput
              lang="en"
              name="directorEn"
              rules="required|en"
              placeholder="Director"
            />
            <CrudInput
              lang="ka"
              name="directorKa"
              rules="required|geo"
              placeholder="რეჟისორი"
            />
            <CrudInput
              lang="en"
              name="descriptionEn"
              rules="required|en"
              placeholder="Description"
            />
            <CrudInput
              lang="ka"
              name="descriptionKa"
              rules="required|geo"
              placeholder="ფილმის აღწერა"
            />
            <CrudInput
              name="budget"
              rules="required"
              :placeholder="$t('placeholders.budget')"
            />
            <CrudInput
              name="releaseDate"
              rules="required"
              :placeholder="$t('placeholders.release_date')"
            />
            <DragAndDrop
              name="thumbnail"
              rules="required"
              :imgValue="imgValue"
            />
            <button class="w-full bg-red-600 py-2">
              {{ $t("add_movie") }}
            </button>
          </section>
        </section>
      </Form>
    </template>
  </crud-modal>
</template>

<script setup>
import { ref } from "vue";
import CrudModal from "@/components/ui/CrudModal.vue";
import CrudInput from "@/components/forms/CrudInput.vue";
import DragAndDrop from "@/components/ui/DragAndDrop.vue";
import axios from "@/config/axios/index.js";
import { useModalStore } from "@/stores/useModalStore.js";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import CloseIcon from "@/components/ui/icons/CloseIcon.vue";
import GenreInput from "@/components/forms/GenreInput.vue";

const { user } = storeToRefs(useUserStore());

const { userThumbnail } = storeToRefs(useUserStore());

const store = useModalStore();

const errorMessage = ref("");

const moviesStore = useMoviesStore();

const array = ref([]);

const imgValue = ref(true);

function onSubmit(values, { resetForm }) {
  errorMessage.value = "";
  imgValue.value = true;

  let data = {
    name_en: values.nameEn,
    name_ka: values.nameKa,
    genre: values.genre,
    director_en: values.directorEn,
    director_ka: values.directorKa,
    description_en: values.descriptionEn,
    description_ka: values.descriptionKa,
    budget: values.budget,
    release_date: values.releaseDate,
    thumbnail: values.thumbnail,
  };

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  axios
    .post("movies", data, config)
    .then((response) => {
      store.toggleAddMoviesModal();
      store.toggleMovieAddedModal();
      moviesStore.movies.unshift(response.data);
      resetForm();
      array.value = [];
      imgValue.value = false;
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}
</script>
