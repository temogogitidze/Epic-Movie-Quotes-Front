<template>
  <crud-modal
    @click="store.toggleAddQuoteFromMovie(false)"
    :showModal="store.showAddQuoteFromMoviesModal"
  >
    <template v-slot:header
      >{{ $t("write_new_quote") }}
      <div
        @click="store.toggleAddQuotesModal(false)"
        class="absolute right-10 top-7"
      >
        <CloseIcon @click="store.toggleAddQuoteFromMovie(false)" /></div
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
          <div class="mt-5 sm:flex gap-4">
            <img
              class="w-full sm:w-[300px] h-[160px] rounded-md"
              alt="movie img"
              :src="imagePath"
            />
            <section class="flex-col mt-3">
              <p>{{ movieName }}</p>
              <div class="flex gap-3">
                <p
                  v-for="genre in genres"
                  :key="genre"
                  class="my-5 p-2 rounded bg-[#6C757D] w-fit"
                >
                  {{ genre }}
                </p>
              </div>

              <p>{{ $t("director") }} : {{ movieDirector }}</p>
            </section>
          </div>
          <section class="mt-5">
            <CrudInput
              lang="en"
              name="bodyEn"
              rules="required|en"
              placeholder="Create new quote"
            />
            <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

            <CrudInput
              lang="ka"
              name="bodyKa"
              rules="required|geo"
              placeholder="ახალი ციტატა"
            />
            <DragAndDrop
              name="thumbnail"
              rules="required"
              :imgValue="imgValue"
            />
            <button class="w-full bg-red-600 py-2">
              {{ $t("add_quote") }}
            </button>
          </section>
        </section>
      </Form>
    </template>
  </crud-modal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import CrudModal from "@/components/ui/CrudModal.vue";
import CrudInput from "@/components/forms/CrudInput.vue";
import axios from "@/config/axios/index.js";
import { useModalStore } from "@/stores/useModalStore.js";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import CloseIcon from "@/components/ui/icons/CloseIcon.vue";
import { useI18n } from "vue-i18n";
import { useMoviesStore } from "@/stores/useMoviesStore";
import DragAndDrop from "@/components/ui/DragAndDrop.vue";

const { user } = storeToRefs(useUserStore());

const { userThumbnail } = storeToRefs(useUserStore());

const store = useModalStore();

const errorMessage = ref("");

const props = defineProps(["movie"]);

const movie = ref();

const genres = ref();

watch(
  () => props.movie,
  (state) => {
    movie.value = state;
    genres.value = JSON.parse(movie.value.genre);
  }
);

const { locale } = useI18n();

const movieName = computed(() => {
  return movie.value?.name[locale.value];
});

const movieDirector = computed(() => {
  return movie.value?.director[locale.value];
});

const movieId = computed(() => {
  return movie.value?.id;
});

const backendUrl = import.meta.env.VITE_API_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + movie.value?.thumbnail;
});

const moviesStore = useMoviesStore();

const imgValue = ref(true);

function onSubmit(values, { resetForm }) {
  let data = {
    body_en: values.bodyEn,
    body_ka: values.bodyKa,
    thumbnail: values.thumbnail,
    movie_id: movieId.value,
  };

  imgValue.value = true;

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  axios
    .post("quotes", data, config)
    .then((response) => {
      store.toggleAddQuoteFromMovie();
      store.toggleQuoteAddedModal();
      moviesStore.quotes.unshift(response.data);
      resetForm();
      imgValue.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
