<template>
  <crud-modal
    @click="store.toggleViewQuoteModal(false)"
    :showModal="store.showViewQuoteModal"
  >
    <template v-slot:header>
      <div
        class="absolute left-3 grid grid-cols-2 divide-x items-center bg-transparent py-2 px-5 rounded"
      >
        <section class="pr-5" @click="switchToEditQuoteModal()">
          <EditIcon />
        </section>
        <section class="pl-5" @click="deleteQuoteById()">
          <DeleteIcon />
        </section>
      </div>
      {{ $t("display_quote") }}
      <div
        @click="store.toggleViewQuoteModal(false)"
        class="absolute right-10 top-7"
      >
        <CloseIcon /></div
    ></template>
    <template v-slot:body>
      <div class="bg-[#11101A] rounded-lg">
        <section class="flex items-center">
          <img
            :src="userThumbnail"
            class="h-[40px] lg:h-[50px] rounded-full max-w-[60px]"
          />
          <p class="ml-5">{{ user.username }}</p>
        </section>
        <section class="my-5">
          <div
            class="w-full border mb-3 border-gray-600 p-2 rounded flex justify-between"
          >
            <p>"{{ quoteEn }}"</p>
            <p class="text-[#6C757D]">Eng</p>
          </div>
          <div
            class="w-full border border-gray-600 p-2 rounded flex justify-between"
          >
            <p>"{{ quoteKa }}"</p>
            <p class="text-[#6C757D]">ქარ</p>
          </div>
        </section>
        <section>
          <img :src="imagePath" alt="quote img" class="w-full" />
        </section>
        <section class="flex gap-4 py-4 border-b border-[#EFEFEF]">
          <p>3</p>
          <CommentIcon />
          <p>4</p>
          <LikeIcon />
        </section>
        <section
          class="py-4"
          v-for="comment in quote.comments"
          :key="comment.id"
        >
          <div class="flex items-center">
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              class="h-[40px] lg:h-[50px] rounded-full"
            />
            <p class="ml-5">{{ comment.username }}</p>
          </div>
          <div class="lg:ml-[70px] pb-4 mt-3 border-b border-[#EFEFEF]">
            <p>{{ comment.body }}</p>
          </div>
        </section>
        <section>
          <Form class="flex items-center py-3 w-full" @submit="submitComment">
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              class="h-[40px] lg:h-[50px] rounded-full mr-5"
            />
            <CommentInput
              name="comment"
              classes="w-full py-2 px-3 rounded bg-[#24222F]"
              :placeholder="$t('placeholders.write_comment')"
            />
          </Form>
        </section>
      </div>
    </template>
  </crud-modal>
</template>

<script setup>
import { Form } from "vee-validate";
import CrudModal from "@/components/ui/CrudModal.vue";
import CommentInput from "@/components/forms/CommentInput.vue";
import CloseIcon from "@/components/ui/icons/CloseIcon.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import CommentIcon from "@/components/ui/icons/CommentsIcon.vue";
import LikeIcon from "@/components/ui/icons/LikeIcon.vue";
import DeleteIcon from "@/components/ui/icons/DeleteIcon.vue";
import EditIcon from "@/components/ui/icons/EditIcon.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import axios from "@/config/axios/index.js";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { user } = storeToRefs(useUserStore());

const { userThumbnail } = storeToRefs(useUserStore());

const { quote } = storeToRefs(useQuotesStore());

const store = useModalStore();

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

function switchToEditQuoteModal() {
  store.toggleEditQuoteModal(true);
  store.toggleViewQuoteModal(false);
}

const { deleteQuote } = useQuotesStore();

function deleteQuoteById() {
  deleteQuote(quote.value.id);
  store.toggleViewQuoteModal();
  store.toggleQuoteDeletedModal();
}
const { getQuote } = useQuotesStore();
function submitComment(values, actions) {
  let data = {
    quote_id: quote.value.id,
    body: values.comment,
  };
  axios
    .post("comments", data)
    .then((response) => {
      actions.resetForm();
      if (response.status === 200) {
        getQuote(quote.value.id);
        store.toggleCommentAddedModal();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
