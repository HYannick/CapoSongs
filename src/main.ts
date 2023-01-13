import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "./assets/main.scss";
import { i18n } from "@/lang/i18n";
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);

const pinia = createPinia();

app.use(MotionPlugin);
app.use(i18n);
app.use(pinia);

app.mount("#app");
