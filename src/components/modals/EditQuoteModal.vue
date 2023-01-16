<template>
  <crud-modal
    @click="store.toggleEditQuoteModal(false)"
    :showModal="store.showEditQuoteModal"
  >
    <template v-slot:header>
      <div
        class="cursor-pointer absolute left-3 grid grid-cols-2 divide-x items-center bg-transparent py-2 px-5 rounded"
      >
        <section
          class="flex"
          v-if="!successMessage && !quoteSuccessfullyDeleted"
          @click="deleteQuoteById"
        >
          <DeleteIcon />
          <p class="ml-4">{{ $t("delete") }}</p>
        </section>
      </div>
      {{ $t("edit_quote") }}
      <div
        @click="store.toggleEditQuoteModal(false)"
        class="absolute right-10 top-7"
      >
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <div
        class="bg-[#11101A] rounded-lg"
        v-if="!successMessage && !quoteSuccessfullyDeleted"
      >
        <section class="flex items-center">
          <img
            :src="userThumbnail"
            class="h-[40px] lg:h-[50px] rounded-full max-w-[60px]"
          />
          <p class="ml-5">{{ user?.username }}</p>
        </section>
        <Form @submit="onSubmit">
          <section class="my-5">
            <CrudInput
              lang="en"
              name="bodyEn"
              rules="required|en"
              :oldValue="quoteEn"
            />
            <CrudInput
              lang="ka"
              name="bodyKa"
              rules="required|geo"
              :oldValue="quoteKa"
            />
          </section>
          <section>
            <PhotoFileInput :src="imagePath" />
          </section>
          <button class="w-full bg-red-600 my-5 py-2">
            {{ $t("save_changes") }}
          </button>
        </Form>
      </div>
      <section class="items-center text-center my-5" v-if="successMessage">
        <p class="text-green-600 mb-5">
          {{ $t("quote_edited_successfully") }} !
        </p>
        <button class="text-center bg-red-600 p-2" @click="goBack()">
          {{ $t("go_back") }}
        </button>
      </section>
      <section
        class="items-center text-center my-5"
        v-if="quoteSuccessfullyDeleted"
      >
        <p class="text-green-600 mb-5">
          {{ $t("quote_deleted_successfully") }} !
        </p>
        <button class="text-center bg-red-600 p-2" @click="goBack()">
          {{ $t("go_back") }}
        </button>
      </section>
    </template>
  </crud-modal>
</template>

<script setup>
import { Form } from "vee-validate";
import CrudInput from "@/components/forms/CrudInput.vue";
import PhotoFileInput from "@/components/forms/PhotoFileInput.vue";
import CrudModal from "@/components/ui/CrudModal.vue";
import CloseIcon from "@/components/ui/icons/CloseIcon.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import DeleteIcon from "@/components/ui/icons/DeleteIcon.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { useMoviesStore } from "@/stores/useMoviesStore.js";

import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import axios from "@/config/axios/index.js";

const { user } = storeToRefs(useUserStore());

const { userThumbnail } = storeToRefs(useUserStore());

const store = useModalStore();

const { quote } = storeToRefs(useQuotesStore());

const successMessage = ref(null);

const quoteSuccessfullyDeleted = ref(null);

const quoteEn = computed(() => {
  return quote.value.body?.en;
});

const quoteKa = computed(() => {
  return quote.value.body?.ka;
});

const backendUrl = import.meta.env.VITE_API_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + quote.value.thumbnail;
});

const moviesStore = useMoviesStore();

function onSubmit(values) {
  let data = {
    body_en: values.bodyEn,
    body_ka: values.bodyKa,
    thumbnail: values.thumbnail,
  };

  const quoteId = ref(quote.value.id);
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  axios
    .post(`quotes/${quoteId.value}`, data, config)
    .then(() => {
      successMessage.value = true;
      moviesStore.edited = true;
    })
    .catch((error) => {
      console.log(error);
    });
}

function goBack() {
  successMessage.value = false;
  store.toggleEditQuoteModal(false);
}

const { deleteQuote } = useQuotesStore();

function deleteQuoteById() {
  const quoteId = ref(quote.value.id);
  deleteQuote(quoteId.value);
  quoteSuccessfullyDeleted.value = true;
}
</script>
