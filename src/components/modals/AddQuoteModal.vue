<template>
  <crud-modal
    @click="toggleAddQuoteModal()"
    :showModal="store.showAddQuotesModal"
  >
    <template v-slot:header
      >{{ $t("write_new_quote") }}
      <div @click="toggleAddQuoteModal()" class="absolute right-10 top-7">
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <Form @submit="onSubmit" v-if="movies.length !== 0">
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
              name="bodyEn"
              rules="required|en"
              placeholder="Create new quote"
            />
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
            <div
              class="text-white items-center text-center relative cursor-default"
            >
              <div v-if="showSelectPlaceholder" class="absolute top-5 px-3">
                <section class="flex items-center">
                  <ChooseMovieIcon />
                  <p class="text-xl ml-3">Choose movie</p>
                </section>
              </div>
              <Field
                class="w-full p-6 mb-5 bg-[#000000] cursor-pointer"
                name="movie"
                as="select"
                @click="handlePlaceholder"
                rules="required"
              >
                <option
                  v-for="movie in movies"
                  :key="movie.id"
                  :value="movie.id"
                >
                  {{ movie.name[locale] }}
                </option>
              </Field>
              <div class="text-left mt-[-2px] mb-2">
                <ErrorMessage class="text-red-300" name="movie" />
              </div>
            </div>

            <button class="w-full bg-red-600 py-2">
              {{ $t("add_quote") }}
            </button>
          </section>
        </section>
      </Form>
      <p class="my-3 text-red-500 text-center" v-else>
        {{ $t("no_movies_yet") }}
      </p>
    </template>
  </crud-modal>
</template>

<script setup>
import { ref } from "vue";
import CrudModal from "@/components/ui/CrudModal.vue";
import CrudInput from "@/components/forms/CrudInput.vue";
import axios from "@/config/axios/index.js";
import { useModalStore } from "@/stores/useModalStore.js";
import { Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import { useMoviesStore } from "@/stores/useMoviesStore";
import { useQuotesStore } from "@/stores/useQuotesStore";
import CloseIcon from "@/components/ui/icons/CloseIcon.vue";
import { Field, ErrorMessage } from "vee-validate";
import ChooseMovieIcon from "@/components/ui/icons/ChooseMovieIcon.vue";
import { useI18n } from "vue-i18n";
import DragAndDrop from "@/components/ui/DragAndDrop.vue";

const { locale } = useI18n();

const { user } = storeToRefs(useUserStore());

const { userThumbnail } = storeToRefs(useUserStore());

const store = useModalStore();

function toggleAddQuoteModal() {
  store.toggleAddQuotesModal(false);
}

const { getMovies } = useMoviesStore();
getMovies();

const { movies } = storeToRefs(useMoviesStore());

const showSelectPlaceholder = ref(true);

function handlePlaceholder() {
  showSelectPlaceholder.value = false;
}

const quotesStore = useQuotesStore();

const imgValue = ref(true);

function onSubmit(values, { resetForm }) {
  imgValue.value = true;
  let data = {
    body_en: values.bodyEn,
    body_ka: values.bodyKa,
    thumbnail: values.thumbnail,
    movie_id: values.movie,
  };
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  axios
    .post("quotes", data, config)
    .then((response) => {
      store.toggleAddQuotesModal();
      store.toggleQuoteAddedModal();
      quotesStore.quotes.unshift(response.data);
      resetForm();
      imgValue.value = false;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
