<template>
  <div class="bg-[#181623] grid h-screen place-items-center text-white pb-20">
    <section class="flex flex-col items-center">
      <img src="@/assets/not-found.png" alt="gandalf" class="z-10 pl-2" />
      <img src="@/assets/not-found-bg.png" alt="gandalf-bg" class="z-0 pt-10" />
      <h1 class="md:text-4xl text-2xl font-bold mt-10">Whoops!</h1>
      <p class="md:text-lg text-base py-4 text-center px-4">
        We can't see the page you are looking for
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

const router = useRouter();

function goBack() {
  router.back();
}
</script>
