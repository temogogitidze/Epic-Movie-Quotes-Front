<template>
  <the-modal
    @click="store.toggleRegisterModal(false)"
    :showModal="store.showRegisterModal"
  >
    <template v-slot:header>
      <p class="text-3xl text-white font-medium">{{ $t("register") }}</p>
      <p class="text-[#6C757D] text-base font-normal mt-3">
        {{ $t("start_journey") }}
      </p>
    </template>
    <template v-slot:body>
      <Form @submit="registerUser" class="flex flex-col">
        <TextInput
          name="name"
          type="text"
          rules="required|alpha_num|min:3|max:15|lowercase"
          :error="usernameError"
        />
        <p v-if="usernameError" class="text-red-600 mb-3">
          {{ usernameError }}
        </p>
        <TextInput
          name="email"
          type="email"
          rules="required|email|lowercase"
          :error="emailError"
        />
        <p v-if="emailError" class="text-red-600 mb-3">{{ emailError }}</p>
        <TextInput
          name="password"
          type="password"
          rules="required|alpha_num|min:8|max:15|lowercase"
        />
        <TextInput
          name="confirm password"
          type="password"
          rules="required|confirmed:password|lowercase"
        />
        <auth-button>{{ $t("get_started") }}</auth-button>
      </Form>
      <GoogleSignup @click="googleSignup()" />
    </template>
    <template v-slot:footer
      ><p class="text-[#6C757D] text-base font-normal mt-5">
        {{ $t("have_an_account") }}?
        <button
          @click="switchModal()"
          class="text-blue-600 underline underline-offset-1 cursor-pointer"
        >
          {{ $t("log_in") }}
        </button>
      </p>
    </template>
  </the-modal>
</template>

<script setup>
import TheModal from "@/components/ui/TheModal.vue";
import AuthButton from "@/components/ui/AuthButton.vue";
import TextInput from "@/components/forms/TextInput.vue";
import GoogleSignup from "@/components/ui/icons/GoogleSignup.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import { Form } from "vee-validate";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const store = useModalStore();

const router = useRouter();

const { t } = useI18n({ useScope: "global" });

function googleSignup() {
  axios.get("auth/google").then((response) => {
    window.location.href = response.data.url;
  });
}
const errors = ref(null);

const usernameError = computed(() => {
  return errors.value?.username ? t("username_error") : null;
});

const emailError = computed(() => {
  return errors.value?.email ? t("email_error") : null;
});

function registerUser(values) {
  errors.value = null;

  let data = {
    username: values.name,
    email: values.email,
    password: values.password,
  };
  axios
    .post("register", data)
    .then(() => {
      router.push({ name: "email-sent" });
    })
    .catch((error) => {
      errors.value = error.response.data.errors;
    });
}

function switchModal() {
  store.toggleRegisterModal(false);
  store.toggleLoginModal(true);
}
</script>
