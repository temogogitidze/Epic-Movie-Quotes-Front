<template>
  <menu-layout>
    <div class="text-white">
      <h2 class="mb-4">Movie Description</h2>
      <AddQuoteFromMovie :movie="movie" />
      <EditMovie />
      <EditQuoteModal />
      <QuoteDeletedModal />
      <MovieDeletedModal />
      <QuoteAddedModal />
      <ViewQuoteModal />
      <CommentAddedModal />
      <div class="xl:flex">
        <section class="xl:w-2/3 pr-3">
          <img :src="imagePath" alt="image poster" class="rounded-md" />
          <section class="hidden xl:flex items-center">
            <p class="my-7 pr-3 border-r border-gray-500">
              {{ $t("quotes") }} ({{ $t("total") }}
              {{ moviesStore.quotes?.length }})
            </p>
            <section class="pl-3">
              <button
                class="bg-red-600 border-0 truncate py-2 px-3 rounded"
                @click="toggleAddQuoteFromMovie()"
              >
                {{ $t("add_quote") }}
              </button>
            </section>
          </section>
        </section>
        <section class="xl:w-1/3 mr-3 xl:mr-16 mt-5 xl:mt-0 items-center">
          <section class="flex justify-between">
            <div>
              <p class="text-lg text-[#DDCCAA]">
                {{ movieName }} ({{ releaseDate }})
              </p>
            </div>
            <div
              class="grid grid-cols-2 divide-x items-center bg-[#24222F] py-2 px-5 rounded"
            >
              <section class="pr-5 cursor-pointer" @click="toggleEditModal()">
                <EditIcon />
              </section>
              <section class="pl-5 cursor-pointer" @click="deleteMovieById()">
                <DeleteIcon />
              </section>
            </div>
          </section>
          <section class="flex gap-2 xl:mt-7">
            <p
              v-for="genre in genres"
              :key="genre"
              class="bg-[#6C757D] py-1 px-2 rounded font-bold"
            >
              {{ genre }}
            </p>
          </section>
          <section class="my-4">
            <p>{{ $t("director") }} : {{ movieDirector }}</p>
            <p class="my-5">{{ $t("budget") }} : {{ movieBudget }}</p>
            <p>
              {{ movieDescription }}
            </p>
          </section>
          <section class="flex xl:hidden items-center">
            <p class="my-7 pr-3 border-r border-gray-500">
              {{ $t("quotes") }} ({{ $t("total") }} )
            </p>
            <section class="pl-3">
              <button class="bg-red-600 border-0 truncate py-2 px-3 rounded">
                {{ $t("add_quote") }}
              </button>
            </section>
          </section>
        </section>
      </div>
      <section class="pt-5 xl:w-2/3 xl:pr-12 break-all">
        <QuotesCard
          v-for="quote in quotes"
          :key="quote.id"
          :id="quote.id"
          :quoteId="quote.id"
          :associatedQuote="quote.body"
          :associatedThumbnail="quote.thumbnail"
          @click="setQuoteId(quote.id)"
        />
      </section>
    </div>
  </menu-layout>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import MenuLayout from "@/components/pages/user/MenuLayout.vue";
import axios from "@/config/axios/index.js";
import { useI18n } from "vue-i18n";
import { useModalStore } from "@/stores/useModalStore";
import QuoteDeletedModal from "@/components/modals/QuoteDeletedModal.vue";
import MovieDeletedModal from "@/components/modals/MovieDeletedModal.vue";
import QuoteAddedModal from "@/components/modals/QuoteAddedModal.vue";
import CommentAddedModal from "@/components/modals/CommentAddedModal.vue";
import ViewQuoteModal from "@/components/modals/ViewQuoteModal.vue";

import EditIcon from "@/components/ui/icons/EditIcon.vue";
import EditQuoteModal from "@/components/modals/EditQuoteModal.vue";
import DeleteIcon from "@/components/ui/icons/DeleteIcon.vue";
import QuotesCard from "@/components/pages/user/quotes/QuotesCard.vue";
import AddQuoteFromMovie from "@/components/modals/AddQuoteFromMovie.vue";
import EditMovie from "@/components/modals/EditMovie.vue";
import { useMoviesStore } from "@/stores/useMoviesStore";
import { useQuotesStore } from "@/stores/useQuotesStore";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

const { getUser } = useUserStore();
getUser();

const route = useRoute();

const router = useRouter();

const store = useModalStore();

const { getQuote } = useQuotesStore();

function setQuoteId(id) {
  getQuote(id);
}

function toggleEditModal() {
  store.toggleEditModal();
}

function toggleAddQuoteFromMovie() {
  store.toggleAddQuoteFromMovie();
}

const params = ref(route.params.id);

const moviesStore = useMoviesStore();

const movie = ref();
const genres = ref();
const { locale } = useI18n();

function fetchMovie() {
  moviesStore.edited = false;
  axios
    .get(`movies/${params.value}`)
    .then((response) => {
      movie.value = response.data;
      moviesStore.quotes = response.data.quotes;
      genres.value = JSON.parse(movie.value.genre);
    })
    .catch(() => {
      router.back();
    });
}

fetchMovie();

watch(
  () => moviesStore.edited,
  (state) => {
    if (state) {
      fetchMovie();
    }
  }
);

const { updatedMovie } = useMoviesStore();

watch(
  () => updatedMovie.value,
  (state) => {
    movie.value = state;
    genres.value = JSON.parse(state.genre);
  }
);

const { quotes } = storeToRefs(useMoviesStore());

const { deleteMovie } = useMoviesStore();

function deleteMovieById() {
  deleteMovie(movie.value.id);
  store.toggleMovieDeletedModal();
}

const backendUrl = import.meta.env.VITE_API_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + movie.value?.thumbnail;
});

const movieName = computed(() => {
  return movie.value?.name[locale.value];
});

const movieDirector = computed(() => {
  return movie.value?.director[locale.value];
});

const movieDescription = computed(() => {
  return movie.value?.description[locale.value];
});

const movieBudget = computed(() => {
  return movie.value?.budget;
});

const releaseDate = computed(() => {
  return movie.value?.release_date;
});
</script>
