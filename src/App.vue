<template>
  <div>
    <newsfeed-navbar v-if="authStore.authenticated" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import NewsfeedNavbar from "@/components/navbars/NewsfeedNavbar.vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/useAuthStore.js";

const authStore = useAuthStore();

const { t } = useI18n({ useScope: "global" });
</script>
