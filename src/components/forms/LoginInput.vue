<template>
  <label for="name" class="text-white"
    >{{ formLabels }}<span class="text-red-500 text-sm">*</span></label
  >
  <Field :name="name" :rules="rules" v-slot="{ field, meta }" class="flex">
    <div class="flex">
      <input
        :type="type"
        v-bind="field"
        class="mt-1 mb-4 py-2.5 px-2 rounded focus:outline-none w-full bg-[#CED4DA]"
        :class="!meta.valid && meta.touched && 'border border-red-500 '"
      />
      <img
        v-if="meta.valid && meta.touched"
        src="@/assets/valid.png"
        alt="valid icon"
        class="w-[18px] md:w-[23px] absolute right-10 md:right-24 mt-4"
      />
      <img
        v-if="!meta.valid && meta.touched"
        src="@/assets/invalid.png"
        alt="invalid icon"
        class="w-[21px] md:w-[23px] absolute right-10 md:right-24 mt-3.5"
      />
    </div>
  </Field>
  <ErrorMessage class="text-red-300 mt-[-2px] mb-2" :name="name" />
</template>

<script setup>
import { computed, ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useI18n } from "vue-i18n";

const props = defineProps({
  name: { type: String, required: true },
  rules: { type: String, required: false },
  type: { type: String, required: false },
});

const { t } = useI18n({ useScope: "global" });

let name = ref(props.name);
let rules = ref(props.rules);
let type = ref(props.type);

const formLabels = computed(() => {
  if (name.value === "name") {
    return t("name");
  } else if (name.value === "email") {
    return t("email");
  } else if (name.value === "password") {
    return t("password");
  } else {
    return t("confirm_password");
  }
});
</script>
