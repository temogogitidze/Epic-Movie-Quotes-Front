<template>
  <div class="flex-col">
    <label for="name" class="text-white">{{ cleanName }}</label>
    <Field :name="name" v-slot="{ field }" :rules="rules" v-model="currentUser">
      <div class="relative text-black my-2">
        <input
          :disabled="disabled"
          :type="typeOfInput"
          v-bind="field"
          class="bg-[#CED4DA] p-1.5 w-full rounded smth"
          :class="[verified ? verifiedStyles : nonVerifiedStyles, classes]"
        />
        <TickIcon v-if="verified" class="absolute top-3 right-2" />
        <WarningIcon v-if="warning" class="absolute top-3 right-2" />
        <ShowPasswordIcon
          @click="showPasswordHandler()"
          v-if="type === 'password'"
          class="absolute top-3 right-2"
        />
      </div>
    </Field>
    <ErrorMessage class="text-red-300" :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { computed, ref } from "vue";
import TickIcon from "@/components/ui/icons/TickIcon.vue";
import WarningIcon from "@/components/ui/icons/WarningIcon.vue";
import ShowPasswordIcon from "@/components/ui/icons/ShowPasswordIcon.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const props = defineProps({
  name: { type: String, required: true },
  rules: { type: String, required: true },
  currentUser: { type: String, required: false },
  bgColor: { type: String, required: false },
  verified: { type: Boolean, required: false },
  warning: { type: Boolean, required: false },
  type: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  classes: { type: String, required: false },
});

const typeOfInput = ref(props.type);

const verifiedStyles = computed(() => {
  return props.verified
    ? "outline outline-[#198754] bg-green-bg text-white"
    : "";
});

const nonVerifiedStyles = computed(() => {
  return props.warning
    ? "outline outline-[#EC9524] bg-orange-bg text-white"
    : "";
});

const cleanName = computed(() => {
  if (props.name === "confirm_password") {
    return t("confirm_password");
  } else if (props.name.includes("secondary")) {
    return t("secondary_email");
  } else if (props.name.includes("email")) {
    return t("email");
  } else {
    return t(props.name);
  }
});

function showPasswordHandler() {
  if (typeOfInput.value === "password") {
    typeOfInput.value = "string";
  } else {
    typeOfInput.value = "password";
  }
}
</script>
