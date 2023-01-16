<template>
  <div>
    <CheckEmailAlert classes="w-full" v-if="showCheckEmailAlert" />
    <EmailAddedAlert classes="w-full" v-if="showEmailAddedAlert" />
    <section class="flex flex-col gap-5 divide-y" v-if="!showAddEmailForm">
      <p>{{ $t("primary_email") }}</p>
      <section class="flex justify-between bg-green-bg p-3 rounded">
        <p>{{ email }}</p>
        <TickProfileIcon />
      </section>
      <section class="grid grid-cols-1 gap-5 divide-y">
        <div v-for="(secondaryEmail, index) in secondaryEmails" :key="index">
          <section>
            <div>
              <p class="py-3 mt-3">{{ secondaryEmail.email }}</p>
            </div>
            <div class="flex justify-between">
              <section v-if="isVerified === index" class="flex items-center">
                <WarningIcon />
                <p class="text-sm text-[#EC9524] ml-2">
                  {{ $t("not_verified") }}
                </p>
              </section>
              <p
                v-else
                @click="makeEmailPrimaryHandler(secondaryEmail, index)"
                class="rounded border border-gray-500 p-2"
              >
                {{ $t("make_this_primary") }}
              </p>

              <p
                @click="removeSecondaryEmailHandler(secondaryEmail.id)"
                class="text-[#CED4DA] p-2"
              >
                {{ $t("remove") }}
              </p>
            </div>
          </section>
        </div>
      </section>
      <section class="pt-5">
        <div>
          <p class="mb-5">{{ $t("add_new_email") }}</p>
        </div>
        <div class="w-full rounded border border-gray-500 p-2 text-center">
          <img src="@/assets/add-icon.png" />
          <p @click="showAddEmailFormHandler()">{{ $t("add") }}</p>
        </div>
      </section>
    </section>
    <section v-if="showAddEmailForm">
      <section>
        <Form @submit="submitForm">
          <section>
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="email"
              rules="required|email"
            />
            <p v-if="errorMessage" class="text-red-600 my-3">
              {{ errorMessage }}
            </p>
          </section>
          <section class="flex justify-between mt-10">
            <p @click="hideAddEmailFormHandler()" class="p-3 text-[#CED4DA]">
              {{ $t("cancel") }}
            </p>
            <button class="bg-red-600 py-1 px-3 rounded">
              {{ $t("add") }}
            </button>
          </section>
        </Form>
      </section>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import TickProfileIcon from "@/components/ui/icons/TickProfileIcon.vue";
import ProfileInput from "@/components/forms/ProfileInput.vue";
import axios from "@/config/axios/index.js";
import CheckEmailAlert from "@/components/alerts/CheckEmailAlert.vue";
import EmailAddedAlert from "@/components/alerts/EmailAddedAlert.vue";
import WarningIcon from "@/components/ui/icons/WarningIcon.vue";

defineProps({
  email: { type: String, required: true },
  email_verified_at: { required: true },
});

const secondaryEmails = ref([]);

function getSecondaryEmails() {
  axios
    .get("secondary-emails")
    .then((response) => {
      secondaryEmails.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

getSecondaryEmails();

const showAddEmailForm = ref(false);

function showAddEmailFormHandler() {
  showAddEmailForm.value = true;
}

function hideAddEmailFormHandler() {
  showAddEmailForm.value = false;
}

const errorMessage = ref(null);

const showEmailAddedAlert = ref(false);

function submitForm(values) {
  errorMessage.value = null;
  let data = {
    email: values.email,
  };
  axios
    .post("add-secondary-email", data)
    .then(() => {
      showAddEmailForm.value = false;
      getSecondaryEmails();
      showEmailAddedAlert.value = true;
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}

function removeSecondaryEmailHandler(id) {
  axios
    .delete(`secondary-emails/${id}`)
    .then(() => {
      getSecondaryEmails();
    })
    .catch((error) => {
      console.log(error);
    });
}

const showCheckEmailAlert = ref(false);

const isVerified = ref(null);

function makeEmailPrimaryHandler(email, index) {
  let data = {
    email: email.email,
  };
  axios
    .post("secondary-email", data)
    .then(() => {
      showCheckEmailAlert.value = true;
      isVerified.value = index;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
