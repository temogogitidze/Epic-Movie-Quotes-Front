<template>
  <Field :name="name" type="text" :placeholder="placeholder" :class="classes" />
</template>

<script setup>
import { Field } from "vee-validate";
defineProps({
  name: { type: String, required: true },
  placeholder: { type: String, required: false },
  classes: { type: String, required: false },
});
</script>
