<template>
  <div v-if="showAlert" class="bg-[#BADBCC] p-3 z-10 rounded" :class="classes">
    <section class="flex justify-between">
      <div class="flex">
        <TickProfileIcon />
        <p class="ml-4 text-[#0F5132]">{{ $t("new_email_added") }} !</p>
      </div>
      <div class="cursor-pointer">
        <CrossIcon @click="showAlertHandler()" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CrossIcon from "@/components/ui/icons/CrossIcon.vue";
import TickProfileIcon from "@/components/ui/icons/TickProfileIcon.vue";

defineProps({ classes: { type: String, required: true } });

const showAlert = ref(true);

function showAlertHandler() {
  showAlert.value = false;
}
</script>
