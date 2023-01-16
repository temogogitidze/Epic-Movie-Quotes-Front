<template>
  <the-modal :showModal="true">
    <template v-slot:header>
      <section class="mt-6">
        <p class="text-3xl text-white font-medium text-center">
          {{ $t("create_new_password") }}
        </p>
        <p class="text-[#6C757D] text-base font-normal mt-3 text-center py-2">
          {{ $t("new_password_should_differ") }}
        </p>
      </section>
    </template>
    <template v-slot:body>
      <Form method="post" @submit="resetPassword" class="flex flex-col">
        <ProfileInput
          name="password"
          type="password"
          rules="required|alpha_num|min:8|max:15"
          classes="py-2.5"
        />
        <ProfileInput
          name="confirm_password"
          type="password"
          classes="py-2.5"
          rules="required|confirmed:password"
        />
        <p v-if="errorMessage" class="text-red-300">{{ errorMessage }}</p>

        <button
          class="bg-red-600 py-2 rounded text-white text-lg my-3 hover:scale-105 duration-300"
        >
          {{ $t("reset_password") }}
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
import ProfileInput from "@/components/forms/ProfileInput.vue";
import TheModal from "@/components/ui/TheModal.vue";
import BackButton from "@/components/ui/BackButton.vue";
import { useRouter, useRoute } from "vue-router";
import { useModalStore } from "@/stores/useModalStore.js";
import axios from "@/config/axios/unauth-index.js";
import { ref, onMounted } from "vue";

const store = useModalStore();

const router = useRouter();

const route = useRoute();

const userEmail = ref("");

let errorMessage = ref("");

function backToLogin() {
  router.push({ name: "home" });
  store.toggleLoginModal(true);
}

const queryParams = ref(route.params.token);

onMounted(() => {
  let data = {
    token: queryParams.value,
  };
  axios
    .post("user-email", data)
    .then((response) => (userEmail.value = response.data))
    .catch((error) => {
      console.log(error);
    });
});

function resetPassword(values) {
  let password = ref(values.password);
  let password_confirmation = ref(values.confirm_password);

  let data = {
    email: userEmail.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  };

  axios
    .post(`reset-password/${queryParams.value}`, data)
    .then((response) => {
      if (response.status === 200) {
        router.push({ name: "password-changed" });
      }
    })
    .catch((error) => {
      errorMessage.value = error.response.data;
    });
}
</script>
