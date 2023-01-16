import { createI18n } from "vue-i18n";
import { languages } from "@/i18n";
import { defaultLocale } from "@/i18n";

const messages = Object.assign(languages);

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
