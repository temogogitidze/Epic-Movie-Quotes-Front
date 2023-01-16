<template>
  <div class="bg-landing-bg h-screen md:px-16 px-10 pt-7">
    <the-modal :showModal="true">
      <template v-slot:header>
        <img src="@/assets/email-sent.png" alt="email-sent" class="mt-8" />
      </template>
      <template v-slot:body>
        <h1 class="text-center py-4 text-white text-3xl">
          {{ $t("thank_you") }}
        </h1>
      </template>
      <template v-slot:footer>
        <section class="flex flex-col items-center mb-4 text-center">
          <p class="text-center text-white py-8 text-lg">
            {{ $t("password_recover_instructions") }}
          </p>
          <a
            href="https://mail.google.com/mail"
            target="_blank"
            class="bg-red-600 border-none w-full p-4 px-3 rounded text-white hover:scale-110 duration-300"
            >{{ $t("go_to_email") }}
          </a>
          <p
            @click="backToHome"
            class="mt-4 text-[#6C757D] cursor-pointer hover:scale-110 hover:text-white duration-300"
          >
            {{ $t("confirm_later") }}
          </p>
        </section>
      </template>
    </the-modal>
  </div>
</template>

<script setup>
import TheModal from "@/components/ui/TheModal.vue";
import TheButton from "@/components/ui/TheButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function backToHome() {
  router.push({ name: "home" });
}
</script>
