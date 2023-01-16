<template>
  <the-modal :showModal="true">
    <template v-slot:header>
      <section class="mt-6">
        <p class="text-3xl text-white font-medium text-center">
          {{ $t("forgot_password") }}?
        </p>
        <p class="text-[#6C757D] text-base font-normal mt-3 text-center py-2">
          {{ $t("enter_the_email") }}
        </p>
      </section>
    </template>
    <template v-slot:body>
      <Form method="post" @submit="sendEmail" class="flex flex-col">
        <TextInput name="email" type="email" rules="required|email|min:3" />
        <p v-if="errorMessage" class="text-red-300">{{ errorMessage }}</p>
        <button
          class="bg-red-600 py-2 rounded text-white text-lg my-3 hover:scale-105 duration-300"
        >
          {{ $t("send_instructions") }}
        </button>
      </Form>
    </template>
    <template v-slot:footer>
      <section class="mt-4">
        <BackButton @click="backToLogin()" class="cursor-pointer">
          <p
            class="text-[#6C757D] text-base font-normal text-center mr-4 duration-300 hover:text-white"
          >
            {{ $t("back_to_login") }}
          </p>
        </BackButton>
      </section>
    </template>
  </the-modal>
</template>

<script setup>
import { Form } from "vee-validate";
import TextInput from "@/components/forms/TextInput.vue";
import TheModal from "@/components/ui/TheModal.vue";
import BackButton from "@/components/ui/BackButton.vue";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/useModalStore.js";
import axios from "@/config/axios/unauth-index.js";
import { ref } from "vue";

const store = useModalStore();

const router = useRouter();

let errorMessage = ref("");

function backToLogin() {
  router.push({ name: "home" });
  store.toggleLoginModal(true);
}

function sendEmail(values) {
  let email = ref(values.email);
  errorMessage.value = "";

  let data = {
    email: email.value,
  };
  axios
    .post("forgot-password", data)
    .then(() => {
      router.push({ name: "check-email" });
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}
</script>
