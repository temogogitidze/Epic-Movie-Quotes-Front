<template>
  <div class="text-white">
    <section class="flex cursor-pointer" @click="navigateToProfilePage()">
      <img
        :src="userThumbnail"
        class="h-[40px] md:h-[45px] lg:h-[60px] max-w-[60px] rounded-full"
        :class="currentRoute ? 'border-2 border-red-600' : ''"
      />
      <section class="flex-col ml-3 lg:mt-1">
        <p class="text-base">{{ user.username }}</p>
        <button
          class="text-xs text-[#CED4DA] text-start sm:truncate md:w-[100px] lg:w-[150px]"
        >
          {{ $t("edit_your_profile") }}
        </button>
      </section>
    </section>
    <section class="mt-8 ml-2">
      <section
        @click="switchToNewsfeed()"
        class="flex items-center cursor-pointer"
      >
        <NewsfeedIcon />
        <p class="ml-4 md:text-sm lg:text-lg">{{ $t("news_feed") }}</p>
      </section>
      <section
        class="flex items-center mt-8 cursor-pointer"
        @click="switchToMovies()"
      >
        <MoviesListIcon />
        <p class="ml-4 truncate md:text-sm lg:text-lg">
          {{ $t("list_of_movies") }}
        </p>
      </section>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

import NewsfeedIcon from "@/components/ui/icons/NewsfeedIcon.vue";
import MoviesListIcon from "@/components/ui/icons/MoviesListIcon.vue";

const { user } = storeToRefs(useUserStore());
const { userThumbnail } = storeToRefs(useUserStore());

const router = useRouter();

function switchToNewsfeed() {
  router.push({ name: "news-feed" });
}

function switchToMovies() {
  router.push({ name: "list-of-movies" });
}

function navigateToProfilePage() {
  router.push({ name: "profile-page" });
}

const route = useRoute();

const currentRoute = computed(() =>
  route.path.includes("/profile") ? true : false
);
</script>
