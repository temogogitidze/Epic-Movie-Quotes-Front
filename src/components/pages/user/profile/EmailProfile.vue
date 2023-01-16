<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-[#11101A]">
    <section class="flex justify-center">
      <CheckEmailAlert
        classes="absolute right-32 top-40 w-[400px]"
        v-if="showEmailAlert"
      />
      <UserUpdatedAlert
        classes="absolute right-32 top-40 w-[400px]"
        v-if="showUserAlert"
      />
      <img
        :src="userThumbnail"
        class="h-[60px] md:h-[80px] lg:h-[140px] max-w-[140px] -mt-10 rounded-full"
      />
    </section>
    <Form @submit="submitForm">
      <div class="">
        <section @click="showButtonsHandler()" class="text-center">
          <ProfileFileInput />
        </section>
        <div class="grid grid-cols-1 gap-10 mt-16">
          <section class="flex w-full">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="username"
              rules="required"
              :currentUser="user.username"
              :disabled="disableInput"
            />
            <p
              v-if="disableInput"
              @click="inputToggleHandler()"
              class="mt-9 ml-7 cursor-pointer"
            >
              {{ $t("edit") }}
            </p>
          </section>
          <section v-if="usernameErrors">
            <p class="text-red-500">{{ usernameErrors }}</p>
          </section>
          <section
            class="grid w-full border-y border-gray-600 py-10 grid-cols-1 gap-5"
          >
            <div class="flex">
              <ProfileInput
                class="lg:w-1/2 w-full"
                name="email"
                :disabled="true"
                rules="required"
                :verified="true"
                :currentUser="user.email"
              />
              <p class="mt-9 ml-7">{{ $t("primary_email") }}</p>
            </div>
            <Form @submit="submitSecondaryEmail">
              <div
                class="flex"
                v-for="(secondaryEmail, index) in secondaryEmails"
                :key="index"
              >
                <ProfileInput
                  class="lg:w-1/2 w-full"
                  :name="'secondary' + (index + 1)"
                  @click="clickedFieldHandler(newInput)"
                  rules="required"
                  :warning="index === warning ? true : false"
                  :disabled="true"
                  :currentUser="secondaryEmail.email"
                />
                <div class="grid grid-cols-2 gap-3 divide-x max-h-[10px]">
                  <p
                    @click="
                      makeEmailPrimaryHandler(secondaryEmail.email, index)
                    "
                    class="mt-9 ml-7 cursor-pointer hover:text-red-600 duration-300"
                  >
                    {{ $t("make_this_primary") }}
                  </p>
                  <p
                    @click="removeSecondaryEmailHandler(secondaryEmail.id)"
                    class="mt-9 cursor-pointer pl-4 hover:text-red-600 duration-300"
                  >
                    {{ $t("remove") }}
                  </p>
                </div>
              </div>
              <div v-for="newInput in inputs" :key="newInput" class="flex">
                <ProfileInput
                  class="lg:w-1/2 w-full"
                  :name="'email' + newInput"
                  @click="clickedFieldHandler(newInput)"
                  rules="required|email"
                  :warning="warning"
                />
                <div class="grid grid-cols-2 gap-3 divide-x max-h-[10px]">
                  <button
                    class="mt-9 ml-7 cursor-pointer hover:text-red-600 duration-300"
                  >
                    {{ $t("add") }}
                  </button>
                  <p
                    @click="removeInput()"
                    class="mt-9 cursor-pointer pl-4 hover:text-red-600 duration-300"
                  >
                    {{ $t("remove") }}
                  </p>
                </div>
              </div>
              <section v-if="secondaryEmailError">
                <p class="text-red-500">{{ secondaryEmailError }}</p>
              </section>
            </Form>
            <section v-if="emailErrors">
              <p class="text-red-500">{{ emailErrors }}</p>
            </section>
            <section
              v-if="!restrictNewInput"
              @click="addInput()"
              class="flex border w-fit px-3 py-2 items-center cursor-pointer text-center rounded hover:scale-105 hover:bg-red-600 duration-300"
            >
              <AddEmailIcon />
              <p class="ml-2">{{ $t("add_new_email") }}</p>
            </section>
          </section>
          <section class="flex w-full">
            <section class="flex w-full">
              <div class="lg:w-1/2 w-full h-[48px]">
                <p class="bg-[#CED4DA] py-1.5 pl-1 rounded text-black">
                  **********
                </p>
              </div>
              <p
                v-if="showEditPassword"
                class="ml-7 mt-2 cursor-pointer"
                @click="toggleEditPassword()"
              >
                {{ $t("edit") }}
              </p>
            </section>
          </section>
          <section v-if="!showEditPassword" class="flex flex-col">
            <div class="border border-gray-500 w-1/2 p-5">
              <h2>{{ $t("passwords_should_contain") }} :</h2>
              <p class="mt-4 text-[#9C9A9A]">
                * {{ $t("8_or_more_characters") }}
              </p>
              <p>* {{ $t("less_than_15_characters") }}</p>
            </div>
          </section>
          <section v-if="!showEditPassword">
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="password"
              type="password"
              rules="alpha_num|min:8|lowercase"
            />
            <br />
            <ProfileInput
              class="lg:w-1/2 w-full"
              name="confirm_password"
              type="password"
              rules="alpha_num|min:8|confirmed:password|lowercase"
            />
          </section>
        </div>
        <br />
      </div>
      <section
        v-if="showSaveChangesButtons"
        class="flex float-right mt-8 -mr-14"
      >
        <p class="p-2 pr-8 cursor-pointer" @click="cancelHandler()">
          {{ $t("cancel") }}
        </p>
        <button class="bg-red-600 p-2 rounded" type="submit">
          {{ $t("save_changes") }}
        </button>
      </section>
    </Form>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import { ref } from "vue";
import ProfileFileInput from "@/components/forms/ProfileFileInput.vue";
import ProfileInput from "@/components/forms/ProfileInput.vue";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import AddEmailIcon from "@/components/ui/icons/AddEmailIcon.vue";
import axios from "@/config/axios/index.js";
import CheckEmailAlert from "@/components/alerts/CheckEmailAlert.vue";
import UserUpdatedAlert from "@/components/alerts/UserUpdatedAlert.vue";

const { userThumbnail } = storeToRefs(useUserStore());

defineProps({ user: { type: Object, required: true } });

const warning = ref(null);

const showEmailAlert = ref(false);

const secondaryEmailError = ref(null);

function submitSecondaryEmail(values) {
  let data = {
    email: values.email1,
  };
  secondaryEmailError.value = null;
  axios
    .post("add-secondary-email", data)
    .then(() => {
      getSecondaryEmails();
      restrictNewInput.value = false;
      inputs.value--;
    })
    .catch((error) => {
      secondaryEmailError.value = error.response.data.message;
    });
}

const emailErrors = ref(null);
const usernameErrors = ref(null);
const showUserAlert = ref(false);

const { getUser } = useUserStore();

function submitForm(values) {
  showUserAlert.value = false;
  (emailErrors.value = null), (usernameErrors.value = null);
  let data = {
    username: values.username,
    email: values.email,
    password: values.password,
    thumbnail: values.thumbnail,
  };

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  axios
    .post("user/update", data, config)
    .then(() => {
      getUser();
      showUserAlert.value = true;
      disableInput.value = true;
      showSaveChangesButtons.value = false;
      showEditPassword.value = true;
    })
    .catch((error) => {
      usernameErrors.value = error.response.data.errors.username
        ? error.response.data.errors.username[0]
        : null;
      emailErrors.value = error.response.data.errors.email[0];
    });
}

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

const inputs = ref(0);

const clickedField = ref(0);

function clickedFieldHandler(id) {
  clickedField.value = id;
}

const restrictNewInput = ref(false);

function addInput() {
  inputs.value++;
  restrictNewInput.value = true;
  showSaveChangesButtons.value = true;
}

function removeInput() {
  inputs.value--;
  restrictNewInput.value = false;
}

function makeEmailPrimaryHandler(email, index) {
  let data = {
    email: email,
  };
  axios
    .post("secondary-email", data)
    .then(() => {
      warning.value = index;
      showEmailAlert.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
}

const showSaveChangesButtons = ref(false);

const disableInput = ref(true);

function inputToggleHandler() {
  disableInput.value = false;
  showSaveChangesButtons.value = true;
}

const showEditPassword = ref(true);

function toggleEditPassword() {
  showEditPassword.value = false;
  showSaveChangesButtons.value = true;
}

function showButtonsHandler() {
  showSaveChangesButtons.value = true;
}

function cancelHandler() {
  showSaveChangesButtons.value = false;
  inputs.value ? inputs.value-- : "";
}
</script>
