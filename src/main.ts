import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "./assets/main.scss";
import { i18n } from "@/i18n";
import { MotionPlugin } from "@vueuse/motion";
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    alert('need to refresh')
  },
  onOfflineReady() {},
});

const app = createApp(App);

app.use(MotionPlugin)
app.use(i18n);
app.use(createPinia());
app.provide('updateSw', updateSW)

app.mount("#app");
