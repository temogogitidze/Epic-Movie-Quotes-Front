<template>
  <div>
    <Form @submit="submitForm">
      <div v-if="!showConfirmModal">
        <section class="bg-[#11101A] px-4 py-3">
          <p>{{ $t("passwords_should_contain") }}:</p>
          <ul style="list-style-type: disc" class="px-4 py-3">
            <li class="text-sm">{{ $t("8_or_more_characters") }}</li>
            <li class="text-sm">{{ $t("less_than_15_characters") }}</li>
          </ul>
        </section>
        <section class="text-black flex flex-col relative mt-4">
          <ProfileInput
            name="password"
            rules="required|alpha_num|min:8|max:15"
            type="password"
          />
          <br />
          <ProfileInput
            name="confirm_password"
            type="password"
            rules="required|confirmed:password"
          />
          <section class="flex justify-between text-white pt-5">
            <p class="mt-2">{{ $t("cancel") }}</p>
            <button class="bg-red-600 rounded px-5 py-2">
              {{ $t("add") }}
            </button>
          </section>
        </section>
      </div>
      <div
        v-if="showConfirmModal"
        class="grid grid-cols-1 divide-y divide-gray-500"
      >
        <section class="text-center py-6">
          <p>{{ $t("sure_to_make_changes") }} ?</p>
        </section>
        <section class="pt-5 flex justify-between">
          <p @click="cancelHandler()" class="py-3">{{ $t("cancel") }}</p>
          <p @click="sendData()" class="bg-red-600 p-3 rounded">
            {{ $t("confirm") }}
          </p>
        </section>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import { ref } from "vue";
import ProfileInput from "@/components/forms/ProfileInput.vue";
import axios from "@/config/axios/index.js";
import { useProfilePageStore } from "@/stores/useProfilePageStore";
import { useUserStore } from "@/stores/useUserStore";

const props = defineProps({
  email: { type: String, required: true },
  username: { type: String, required: true },
});

const password = ref(null);
const confirm_password = ref(null);

const showConfirmModal = ref(false);

function submitForm(values) {
  password.value = values.password;
  confirm_password.value = values.confirm_password;
  showConfirmModal.value = !showConfirmModal.value;
}

const profileStore = useProfilePageStore();

const { getUser } = useUserStore();

function sendData() {
  let data = {
    username: props.username,
    email: props.email,
    password: password.value,
  };
  axios
    .post("user/update", data)
    .then(() => {
      profileStore.toggleShowForm(true);
      profileStore.toggleShowModal(true);
      profileStore.togglePasswordEdited(true);
      getUser();
    })
    .catch(() => {
      showConfirmModal.value = false;
    });
}

function cancelHandler() {
  showConfirmModal.value = !showConfirmModal.value;
}
</script>
