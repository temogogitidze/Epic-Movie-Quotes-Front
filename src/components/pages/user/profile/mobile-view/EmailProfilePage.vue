<template>
  <div class="w-full -mx-7">
    <UserUpdatedAlert v-if="userUpdated" classes=" absolute" />
    <section class="mb-4 mt-1 pl-7">
      <BackArrowMobileIcon @click="goBackHandler()" />
    </section>
    <div class="bg-[#24222F] w-screen px-7 py-10 text-white">
      <section class="mb-3">
        <SuccessfullEditModal
          v-if="
            profileStore.usernameEdited &&
            profiUserUpdatedAlertleStore.showSuccessfullEditModal
          "
          ><p class="text-[#0F5132] pl-3">
            {{ $t("username_changed_successfully") }}
          </p>
        </SuccessfullEditModal>
      </section>
      <section class="mb-3">
        <SuccessfullEditModal
          v-if="
            profileStore.passwordEdited && profileStore.showSuccessfullEditModal
          "
          ><p class="text-[#0F5132] pl-3">
            {{ $t("password_changed_successfully") }}
          </p>
        </SuccessfullEditModal>
      </section>
      <section v-if="profileStore.showForm" class="flex justify-center">
        <img :src="userThumbnail" class="h-[140px] max-w-[140px]" />
      </section>
      <Form @submit="submitForm">
        <div v-if="profileStore.showForm">
          <section class="text-center">
            <MobileFileInput />
          </section>
          <section class="mt-8 grid grid-cols-1 gap-2 divide-y divide-gray-500">
            <div class="flex flex-col">
              <p>{{ $t("username") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">{{ userName }}</p>
                <p @click="editUsernameHandler()" class="mt-2 text-[#CED4DA]">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div class="pt-5">
              <p>{{ $t("password") }}</p>
              <div class="flex justify-between">
                <p class="mt-2">*********</p>
                <p @click="editPasswordHandler()" class="mt-2 text-[#CED4DA]">
                  {{ $t("edit") }}
                </p>
              </div>
            </div>
            <div class="pt-5 flex justify-between">
              <p>{{ $t("email") }}</p>
              <ForwardArrowIcon @click="editEmailHandler()" />
            </div>
          </section>
          <button class="w-full mt-5 bg-red-600 p-2 rounded">
            {{ $t("save") }}
          </button>
        </div>
      </Form>
      <ChangeUsername
        :email="user.email"
        v-if="!profileStore.showForm && showUsernameInput"
      />
      <ChangePassword
        :email="user.email"
        :username="user.username"
        v-if="!profileStore.showForm && showPasswordInput"
      />
      <ChangeEmail
        :email="user.email"
        :email_verified_at="user.email_verified_at"
        v-if="!profileStore.showForm && showEmailInput"
      />
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BackArrowMobileIcon from "@/components/ui/icons/BackArrowMobileIcon.vue";
import ChangePassword from "@/components/pages/user/profile/mobile-view/ChangePassword.vue";
import ChangeEmail from "@/components/pages/user/profile/mobile-view/ChangeEmail.vue";
import MobileFileInput from "@/components/forms/MobileFileInput.vue";
import SuccessfullEditModal from "@/components/modals/SuccessfullEditModal.vue";
import ForwardArrowIcon from "@/components/ui/icons/ForwardArrowIcon.vue";
import ChangeUsername from "@/components/pages/user/profile/mobile-view/ChangeUsername.vue";
import { useUserStore } from "@/stores/useUserStore";
import { useProfilePageStore } from "@/stores/useProfilePageStore";
import axios from "@/config/axios/index.js";
import UserUpdatedAlert from "@/components/alerts/UserUpdatedAlert.vue";
import { storeToRefs } from "pinia";

const props = defineProps({ user: { type: Object, required: true } });

const userName = computed(() => {
  return props.user.username;
});

const { userThumbnail } = storeToRefs(useUserStore());

const showUsernameInput = ref(false);

const profileStore = useProfilePageStore();

const { toggleShowForm } = useProfilePageStore();

const router = useRouter();

function editUsernameHandler() {
  toggleShowForm();
  showUsernameInput.value = true;
  showPasswordInput.value = false;
  showEmailInput.value = false;
}

const showPasswordInput = ref(false);

function editPasswordHandler() {
  toggleShowForm();
  showUsernameInput.value = false;
  showPasswordInput.value = true;
  showEmailInput.value = false;
}

const showEmailInput = ref(false);

function editEmailHandler() {
  toggleShowForm();
  showPasswordInput.value = false;
  showUsernameInput.value = false;
  showEmailInput.value = true;
}

function goBackHandler() {
  if (
    showUsernameInput.value == false &&
    showPasswordInput.value == false &&
    profileStore.showForm == true
  ) {
    router.back();
  } else {
    toggleShowForm(true);
    showUsernameInput.value = false;
    showPasswordInput.value = false;
  }
}

const { getUser } = useUserStore();

const userUpdated = ref(false);

function submitForm(values) {
  userUpdated.value = false;
  let data = {
    thumbnail: values.thumbnail,
    username: props.user.username,
    email: props.user.email,
  };

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  axios
    .post("user/update", data, config)
    .then(() => {
      getUser();
      userUpdated.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
