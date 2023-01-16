<template>
  <Field name="thumbnail" type="file" v-slot="{ field }">
    <input type="file" id="getSecondFile" class="hidden" v-bind="field" />
    <p
      class="cursor-pointer mt-2"
      onclick="document.getElementById('getSecondFile').click()"
    >
      {{ $t("upload_new_photo") }}
    </p>
  </Field>
</template>

<script setup>
import { Field } from "vee-validate";
</script>
