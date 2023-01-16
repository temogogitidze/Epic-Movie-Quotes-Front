<template>
  <div
    class="text-white p-6 relative bg-[#11101A] md:rounded-md border-t border-gray-700 mb-5"
  >
    <section class="absolute bottom-8 right-5 md:top-5 md:right-5">
      <DotsDropdown @click="onClick" />
    </section>
    <section class="md:flex border-b border-gray-700 items-center">
      <section class="md:w-1/3 pb-5">
        <img :src="imagePath" alt="quote img" class="min-h-[100px]" />
      </section>
      <section class="md:w-2/3 md:pl-8">
        <p class="text-[#CED4DA] pb-2">{{ quoteText }}</p>
      </section>
    </section>
    <section class="pt-5 flex items-center">
      <span class="px-4">{{ numberOfComments }}</span> <CommentIcon />
      <span class="px-4">{{ numberOfLikes }}</span>
      <LikeIcon class="fill-white" />
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import CommentIcon from "@/components/ui/icons/CommentsIcon.vue";
import LikeIcon from "@/components/ui/icons/LikeIcon.vue";
import DotsDropdown from "@/components/ui/dropdowns/DotsDropdown.vue";
import { useI18n } from "vue-i18n";
import axios from "@/config/axios/index.js";

const { locale } = useI18n();

const props = defineProps({
  associatedQuote: { type: Object, required: true },
  associatedThumbnail: { type: String, required: true },
  onClick: { required: true },
  quoteId: { type: Number, required: true },
});

onMounted(() => {
  axios.get(`quotes/${props.quoteId}`).then((response) => {
    numberOfComments.value = response.data.comments.length;
    numberOfLikes.value = response.data.likes.length;
  });
});

const numberOfComments = ref(null);
const numberOfLikes = ref(null);

const quoteText = computed(() => {
  return props.associatedQuote[locale.value];
});

const backendUrl = import.meta.env.VITE_API_THUMBNAIL_URL;

const imagePath = computed(() => {
  return backendUrl + props.associatedThumbnail;
});
</script>
