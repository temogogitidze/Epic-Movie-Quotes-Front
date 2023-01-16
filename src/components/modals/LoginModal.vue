<template>
  <the-modal
    :showModal="store.showLoginModal"
    @click="store.toggleLoginModal(false)"
  >
    <template v-slot:header>
      <p class="text-3xl text-white font-medium">
        {{ $t("login_to_account") }}
      </p>
      <p class="text-[#6C757D] text-base font-normal mt-3">
        {{ $t("enter_your_details") }}
      </p>
    </template>
    <template v-slot:body>
      <Form method="post" @submit="onSubmit" class="flex flex-col">
        <TextInput
          name="email"
          type="text"
          rules="required|min:3|lowercase"
          :error="validationError"
        />
        <ProfileInput
          name="password"
          type="password"
          rules="required|min:8"
          :error="validationError"
          classes="py-2.5"
        />
        <p v-if="validationError" class="text-red-600">{{ validationError }}</p>
        <section class="flex justify-between mb-3">
          <p class="text-white cursor-pointer">{{ $t("remember_me") }}</p>
          <p
            @click="navigateToForgotPassword"
            class="text-blue-500 underline underline-offset-1 cursor-pointer"
          >
            {{ $t("forgot_password") }}
          </p>
        </section>
        <auth-button>{{ $t("log_in") }}</auth-button>
      </Form>
      <GoogleSignup @click="loginWithGoogle" />
    </template>
    <template v-slot:footer>
      <p class="text-[#6C757D] text-base font-normal mt-5">
        {{ $t("dont_have_account") }} ?
        <button
          @click="toggleModals"
          class="text-blue-600 underline underline-offset-1 cursor-pointer"
        >
          {{ $t("sign_up") }}
        </button>
      </p>
    </template>
  </the-modal>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Form } from "vee-validate";
import ProfileInput from "@/components/forms/ProfileInput.vue";
import AuthButton from "@/components/ui/AuthButton.vue";
import TheModal from "@/components/ui/TheModal.vue";
import GoogleSignup from "@/components/ui/icons/GoogleSignup.vue";
import TextInput from "@/components/forms/TextInput.vue";
import { useModalStore } from "@/stores/useModalStore.js";
import axios from "@/config/axios/index.js";

const store = useModalStore();

const router = useRouter();

function loginWithGoogle() {
  axios.get("auth/google").then((response) => {
    window.location.href = response.data.url;
  });
}

function toggleModals() {
  store.toggleLoginModal(false);
  store.toggleRegisterModal(true);
}

const { t } = useI18n({ useScope: "global" });

const errorMessage = ref(null);

const validationError = computed(() => {
  if (errorMessage.value === "Wrong email or password") {
    return t("wrong_email_or_password");
  } else if (errorMessage.value == "User does not exist!") {
    return t("user_does_not_exist");
  } else {
    return null;
  }
});

function onSubmit(values) {
  let email = ref(values.email);
  let password = ref(values.password);

  let data = {
    login: email.value,
    password: password.value,
  };
  axios
    .post("login", data)
    .then(() => {
      router.push({ name: "redirect-page" });
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}

function navigateToForgotPassword() {
  router.push({ name: "forgot-password" });
  store.toggleLoginModal(true);
}
</script>
