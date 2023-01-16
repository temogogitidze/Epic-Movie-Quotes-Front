<template>
  <div class="px-4 md:ml-5 mt-10 text-white">
    <QuoteAddedModal />
    <CommentAddedModal />
    <div
      v-for="(quote, index) in resultQuery"
      :key="quote.id"
      class="p-3 mb-5 bg-[#11101A] rounded-lg"
    >
      <section class="flex items-center">
        <img
          :src="
            quote.user.thumbnail
              ? backendUrl + quote.user.thumbnail
              : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          "
          class="h-[40px] lg:h-[50px] max-w-[60px] rounded-full"
        />
        <p class="ml-5">{{ quote.user.username }}</p>
      </section>
      <section class="my-5">
        <p class="break-all">
          "{{ quote.body[lang] }}" Movie - {{ quote.movie.name[lang] }}. ({{
            quote.movie.release_date
          }})
        </p>
      </section>
      <section>
        <img
          :src="backendUrl + quote.thumbnail"
          alt="quote img"
          class="xl:w-[890px] xl:h-[500px]"
        />
      </section>
      <section class="flex gap-4 py-4 border-b border-[#EFEFEF]">
        <p>{{ quote.comments.length }}</p>
        <CommentIcon />
        <p>{{ quote.likes.length }}</p>
        <LikedQuote :quoteId="quote.id" />
      </section>
      <section class="py-4" v-for="comment in quote.comments" :key="comment.id">
        <div class="flex items-center">
          <img
            :src="
              comment.thumbnail
                ? backendUrl + comment.thumbnail
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            "
            class="h-[40px] lg:h-[50px] rounded-full max-w-[60px]"
          />
          <p class="ml-5">{{ comment.username }}</p>
        </div>
        <div class="lg:ml-[70px] pb-4 mt-3 border-b border-[#EFEFEF]">
          <p>{{ comment.body }}</p>
        </div>
      </section>
      <section @click="getQuoteId(quote.id)">
        <Form class="flex items-center py-3 w-full" @submit="submitComment">
          <img
            :src="userThumbnail"
            class="h-[40px] lg:h-[50px] rounded-full mr-5 max-w-[60px]"
          />
          <CommentInput
            name="comment"
            classes="w-full py-2 px-3 rounded bg-[#24222F]"
            :placeholder="$t('placeholders.write_comment')"
          />
        </Form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { computed, ref } from "vue";
import { useQuotesStore } from "@/stores/useQuotesStore";
import { storeToRefs } from "pinia";
import CommentAddedModal from "@/components/modals/CommentAddedModal.vue";
import LikedQuote from "@/components/pages/user/newsfeed/LikedQuote.vue";

import CommentIcon from "@/components/ui/icons/CommentsIcon.vue";
import QuoteAddedModal from "@/components/modals/QuoteAddedModal.vue";
import CommentInput from "@/components/forms/CommentInput.vue";
import { useModalStore } from "@/stores/useModalStore";
import { useUserStore } from "@/stores/useUserStore";
import { useI18n } from "vue-i18n";
import axios from "@/config/axios/index.js";

const { locale } = useI18n();

const { quotes } = storeToRefs(useQuotesStore());

const { userThumbnail } = storeToRefs(useUserStore());

const backendUrl = import.meta.env.VITE_API_THUMBNAIL_URL;

const lang = computed(() => {
  return locale.value;
});
const quotesStore = useQuotesStore();

const resultQuery = computed(() => {
  if (quotesStore.searchQuery && quotesStore.searchQuery.startsWith("#")) {
    let cleanString = ref(quotesStore.searchQuery.slice(1));
    return quotes.value.filter((item) => {
      return cleanString.value
        .toLowerCase()
        .split(" ")
        .every((v) => item.body[locale.value].toLowerCase().startsWith(v));
    });
  } else if (
    quotesStore.searchQuery &&
    quotesStore.searchQuery.startsWith("@")
  ) {
    let cleanString = ref(quotesStore.searchQuery.slice(1));

    return quotes.value.filter((item) => {
      return cleanString.value
        .toLowerCase()
        .split(" ")
        .every((v) =>
          item.movie.name[locale.value].toLowerCase().startsWith(v)
        );
    });
  } else {
    return quotes.value;
  }
});

const quoteId = ref(null);

function getQuoteId(value) {
  quoteId.value = value;
}

window.onscroll = function () {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    getQuotes();
  }
};

const store = useModalStore();

const { getQuotes } = useQuotesStore();

const { getQuotesRefresh } = useQuotesStore();

function submitComment(values, actions) {
  let data = {
    quote_id: quoteId.value,
    body: values.comment,
  };

  const config = {
    headers: { "X-Socket-Id": window.Echo.socketId() },
  };

  axios
    .post("comments", data, config)
    .then((response) => {
      if (response.status === 200) {
        actions.resetForm();
        getQuotesRefresh();
        store.toggleCommentAddedModal();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
