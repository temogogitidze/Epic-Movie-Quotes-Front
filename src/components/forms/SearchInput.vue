<template>
  <Field :name="name" :rules="rules" v-slot="{ field }" class="flex">
    <div class="flex">
      <input
        v-bind="field"
        :placeholder="placeholder"
        :type="type"
        :class="classes"
      />
    </div>
  </Field>
</template>

<script setup>
import { Field } from "vee-validate";

defineProps({
  name: { type: String, required: true },
  rules: {
    type: String,
    required: false,
  },
  type: { type: String, required: false },
  placeholder: { type: String, required: false },
  classes: { type: String, required: false },
});
</script>
