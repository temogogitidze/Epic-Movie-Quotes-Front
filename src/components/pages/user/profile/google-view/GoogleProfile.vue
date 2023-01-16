<template>
  <div class="2xl:w-5/6 mt-20 px-16 bg-[#11101A]">
    <UserUpdatedAlert
      classes="absolute right-20 w-1/3"
      v-if="showUserUpdatedAlert"
    />
    <section class="flex justify-center">
      <img
        :src="userThumbnail"
        class="h-[60px] md:h-[80px] lg:h-[140px] max-w-[140px] -mt-10 rounded-full"
      />
    </section>
    <Form @submit="submitForm">
      <div class="text-white">
        <section @click="showChangeButtons" class="text-center">
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
              class="mt-9 ml-7 cursor-pointer"
              @click="inputToggleHandler()"
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
                :currentUser="user.email"
              />
              <p class="mt-9 ml-7">{{ $t("email") }}</p>
            </div>
          </section>
        </div>
        <br />
      </div>
      <section
        v-if="showSaveChangesButtons"
        class="flex float-right mt-8 -mr-14"
      >
        <p
          @click="hideChangeButtons()"
          class="p-2 pr-8 text-[#CED4DA] cursor-pointer"
        >
          {{ $t("cancel") }}
        </p>
        <button class="bg-red-600 p-2 rounded text-white" type="submit">
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
import UserUpdatedAlert from "@/components/alerts/UserUpdatedAlert.vue";
import axios from "@/config/axios/index.js";

defineProps({ user: { type: Object, required: true } });

const { userThumbnail } = storeToRefs(useUserStore());

const { getUser } = useUserStore();

const disableInput = ref(true);

const showSaveChangesButtons = ref(false);

function showChangeButtons() {
  showSaveChangesButtons.value = true;
}

function inputToggleHandler() {
  disableInput.value = disableInput.value = false;
  showSaveChangesButtons.value = true;
}

const usernameErrors = ref(false);

const showUserUpdatedAlert = ref(false);

function submitForm(values) {
  showUserUpdatedAlert.value = false;

  let data = {
    username: values.username,
    email: values.email,
    thumbnail: values.thumbnail,
  };

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  axios
    .post("user/update", data, config)
    .then(() => {
      getUser();
      showUserUpdatedAlert.value = true;
      disableInput.value = true;
      showSaveChangesButtons.value = false;
      usernameErrors.value = null;
    })
    .catch((error) => {
      usernameErrors.value = error.response.data.errors.username[0];
    });
}

function hideChangeButtons() {
  disableInput.value = true;
  showSaveChangesButtons.value = false;
}
</script>
