<template>
  <Field v-slot="{ meta }" name="thumbnail" v-model="fileModel">
    <label
      for="file"
      :class="[
        !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
        meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
      ]"
      class="bg-[#11101A] text-white h-[80px] border border-white-1 px-2 items-center rounded-md hidden"
      @drop.prevent="dragFile"
      @dragover.prevent
    >
    </label>
    <input
      id="file"
      name="file"
      type="file"
      class="bg-[#11101A] border border-white-1 hidden w-full h-full"
      @change="setImage"
    />
  </Field>
  <div class="relative w-full border border-white-1 min-h-[80px] rounded-lg">
    <img :src="src" alt="" class="w-auto h-auto" id="image" />
    <label
      for="file"
      class="cursor-pointer bg-black opacity-[0.6] w-[135px] h-[84px] flex flex-col items-center justify-center rounded-xl absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
    >
      <img
        src="@/assets/photocamera-icon.png"
        alt=""
        class="z-10 w-[18px] h-auto"
      />
      <p class="text-white text-[16px] whitespace-nowrap">Change photo</p>
    </label>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { ref } from "vue";

const fileModel = ref(null);

defineProps(["src"]);

const setImage = function (event) {
  let output = document.getElementById("image");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
  fileModel.value = event.target.files[0];
};
</script>
