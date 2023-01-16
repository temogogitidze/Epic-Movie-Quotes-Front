<template>
  <div class="bg-[#181623] grid h-screen place-items-center text-white pb-20">
    <section class="flex flex-col items-center">
      <img
        src="@/assets/gandalf.png"
        alt="gandalf"
        class="z-10 absolute pl-2"
      />
      <img src="@/assets/gandalf-bg.png" alt="gandalf-bg" class="z-0 pt-14" />
      <h1 class="md:text-4xl text-2xl font-bold mt-10">You shall not pass!</h1>
      <p class="md:text-lg text-base py-4 text-center px-4">
        Sorry, but you don’t have permission to access this page
      </p>
      <the-button
        @click="goBack"
        classes="bg-red-600 border-red-600 md:text-lg hover:scale-110 duration-300"
        >Go back
      </the-button>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore.js";

const authStore = useAuthStore();

const router = useRouter();

function goBack() {
  if (!authStore.authenticated) {
    router.push({ name: "home" });
  } else {
    router.push({ name: "news-feed" });
  }
}
</script>
