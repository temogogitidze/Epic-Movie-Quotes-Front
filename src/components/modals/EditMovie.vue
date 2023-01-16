<template>
  <crud-modal @click="toggleEditModal()" :showModal="store.showEditMovieModal">
    <template v-slot:header
      >{{ $t("edit_movie") }}
      <div @click="toggleEditModal()" class="absolute right-10 top-7">
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
              :oldValue="userData?.name.en"
            />
            <CrudInput
              lang="ka"
              name="nameKa"
              rules="required|geo"
              placeholder="ფილმის სახელი"
              :oldValue="userData?.name.ka"
            />
            <GenreInput name="genre" :values="genres" />
            <CrudInput
              lang="en"
              name="directorEn"
              rules="required|en"
              placeholder="Director"
              :oldValue="userData?.director.en"
            />
            <CrudInput
              lang="ka"
              name="directorKa"
              rules="required|geo"
              placeholder="რეჟისორი"
              :oldValue="userData?.director.ka"
            />
            <CrudInput
              lang="en"
              name="descriptionEn"
              rules="required|en"
              placeholder="Description"
              :oldValue="userData?.description.en"
            />
            <CrudInput
              lang="ka"
              name="descriptionKa"
              rules="required|geo"
              placeholder="ფილმის აღწერა"
              :oldValue="userData?.description.ka"
            />
            <CrudInput
              name="budget"
              rules="required"
              :placeholder="$t('placeholders.budget')"
              :oldValue="userData?.budget"
            />
            <CrudInput
              name="releaseDate"
              rules="required"
              :placeholder="$t('placeholders.release_date')"
              :oldValue="userData?.release_date"
            />
            <DragAndDrop name="thumbnail1" rules="" />
            <button type="submit" class="w-full bg-red-600 py-2">
              {{ $t("save_changes") }}
            </button>
          </section>
        </section>
      </Form>
    </template>
  </crud-modal>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import CrudModal from "@/components/ui/CrudModal.vue";
import CrudInput from "@/components/forms/CrudInput.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import DragAndDrop from "@/components/ui/DragAndDrop.vue";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import CloseIcon from "@/components/ui/icons/CloseIcon.vue";
import axios from "@/config/axios/index.js";
import GenreInput from "@/components/forms/GenreInput.vue";

const { user } = storeToRefs(useUserStore());

const { userThumbnail } = storeToRefs(useUserStore());

const store = useModalStore();

const route = useRoute();

const params = ref(route.params.id);

const userData = ref();
const genres = ref();

axios.get(`movies/${params.value}`).then((response) => {
  userData.value = response.data;
  genres.value = JSON.parse(userData.value.genre);
});

function toggleEditModal() {
  store.toggleEditModal(false);
}

const { updatedMovie } = useMoviesStore();

function onSubmit(values) {
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
    thumbnail: values.thumbnail1,
  };

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  axios
    .post(`movies/${params.value}`, data, config)
    .then((response) => {
      updatedMovie.value = response.data;
      toggleEditModal();
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
