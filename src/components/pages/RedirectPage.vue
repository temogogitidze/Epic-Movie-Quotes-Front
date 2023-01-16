<template>
  <div class="bg-landing-bg h-screen md:px-16 px-10 pt-7">
    <the-modal :showModal="true">
      <template v-slot:header>
        <img src="@/assets/email-verified.png" alt="email-sent" class="mt-8" />
      </template>
      <template v-slot:body>
        <h1 class="text-center py-4 text-white text-3xl">
          {{ $t("redirecting") }}!
        </h1>
      </template>
      <template v-slot:footer>
        <section class="flex flex-col items-center mb-8">
          <p class="text-center text-white py-8 text-lg">
            {{ $t("redirecting_in") }} {{ counter }}
          </p>
        </section>
      </template>
    </the-modal>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import TheModal from "@/components/ui/TheModal.vue";

const authStore = useAuthStore();

const router = useRouter();

const counter = ref(2);

setTimeout(() => {
  counter.value--;
}, 1000);

setTimeout(() => {
  authStore.authenticated = true;
  router.push({ name: "news-feed" });
}, 2000);
</script>
