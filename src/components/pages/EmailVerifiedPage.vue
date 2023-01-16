<template>
  <div class="bg-landing-bg h-screen md:px-16 px-10 pt-7">
    <the-modal :showModal="true">
      <template v-slot:header>
        <img src="@/assets/email-verified.png" alt="email-sent" class="mt-8" />
      </template>
      <template v-slot:body>
        <h1 class="text-center py-4 text-white text-3xl">
          {{ $t("thank_you") }}!
        </h1>
      </template>
      <template v-slot:footer>
        <section class="flex flex-col items-center mb-8">
          <p class="text-center text-white py-8 text-lg">
            {{ $t("email_verified") }}
          </p>
          <div class="w-full">
            <the-button
              @click="redirectToNewsFeed()"
              classes="bg-red-600 border-none w-full h-[40px] hover:scale-110 duration-300"
              >{{ $t("login_to_account") }}
            </the-button>
          </div>
        </section>
      </template>
    </the-modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";
import TheModal from "@/components/ui/TheModal.vue";
import TheButton from "@/components/ui/TheButton.vue";
import { useRouter, useRoute } from "vue-router";
import { useModalStore } from "@/stores/useModalStore.js";

const router = useRouter();

const route = useRoute();

const store = useModalStore();

function redirectToNewsFeed() {
  router.push({ name: "home" });
  store.toggleLoginModal(true);
}

const queryParams = ref(route.params.token);

onMounted(() => {
  axios.post(`/email/${queryParams.value}`);
});
</script>
