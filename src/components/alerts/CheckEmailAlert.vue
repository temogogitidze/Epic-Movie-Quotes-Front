<template>
  <div v-if="showAlert" class="bg-[#BADBCC] p-3 z-10 rounded" :class="classes">
    <section class="flex justify-between">
      <div class="flex">
        <TickProfileIcon />
        <p class="ml-4 text-[#0F5132]">{{ $t("simple_alert") }}</p>
      </div>
      <div class="cursor-pointer">
        <CrossIcon @click="showAlertHandler()" />
      </div>
    </section>
    <section>
      <p class="my-4 ml-10 text-black">
        {{ $t("plese_check_email_to_verify_new_adress") }}
      </p>
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
