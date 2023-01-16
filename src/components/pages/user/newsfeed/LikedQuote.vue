<template>
  <LikeIcon
    :class="likeable ? 'fill-white' : 'fill-red-500'"
    @click="handleQuoteLike()"
  />
</template>

<script setup>
import { ref } from "vue";
import LikeIcon from "@/components/ui/icons/LikeIcon.vue";
import axios from "@/config/axios/index.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";

const props = defineProps({ quoteId: { type: Number, required: true } });

const likeable = ref(null);

function getLikes() {
  axios.post("likes/" + props.quoteId + "/likeable").then((response) => {
    likeable.value = response.data.likeable;
  });
}
getLikes();

const { getQuotesRefresh } = useQuotesStore();

function handleQuoteLike() {
  likeable.value = !likeable.value;

  const config = {
    headers: { "X-Socket-Id": window.Echo.socketId() },
  };

  let data = {
    like: true,
    quote_id: props.quoteId,
  };
  axios
    .post("like", data, config)
    .then(() => {
      getQuotesRefresh();
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
