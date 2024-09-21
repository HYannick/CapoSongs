import { createI18n } from "vue-i18n";
import pt from "@/lang/pt";
import en from "@/lang/en";
import fr from "@/lang/fr";

const commonI18n = { en, fr, pt };

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: commonI18n,
  legacy: false,
});
