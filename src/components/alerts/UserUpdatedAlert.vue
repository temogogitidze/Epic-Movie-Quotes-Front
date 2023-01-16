<template>
  <div
    v-if="showAlert"
    class="bg-[#BADBCC] p-3 text-[#0F5132] z-10"
    :class="classes"
  >
    <section class="flex justify-between">
      <div class="flex">
        <TickProfileIcon />
        <p class="ml-4">{{ $t("succesfully_updated") }}</p>
      </div>
      <div class="cursor-pointer">
        <CrossIcon @click="showAlertHandler()" />
      </div>
    </section>
    <section>
      <p class="my-4 ml-10">{{ $t("congratulations_user_is_updated") }} !</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CrossIcon from "@/components/ui/icons/CrossIcon.vue";
import TickProfileIcon from "@/components/ui/icons/TickProfileIcon.vue";

defineProps({ classes: { required: true, type: String } });
const showAlert = ref(true);

function showAlertHandler() {
  showAlert.value = false;
}
</script>
