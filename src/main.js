import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import VueAxios from "vue-axios";
import i18n from "@/i18n/i18n";

import { useI18n } from "vue-i18n";

import Pusher from "pusher-js";
Pusher;
import echo from "@/config/broadcasting";

import "@/assets/main.css";

import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages";

import "@/config/axios/index.js";

import TheButton from "@/components/ui/TheButton.vue";

const app = createApp(App, {
  setup() {
    const { t } = useI18n();
    return { t };
  },
});

app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(echo);

app.component("TheButton", TheButton);

app.mount("#app");
