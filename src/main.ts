import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/main.scss";
import { i18n } from "@/lang/i18n";
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);

app.use(MotionPlugin);
app.use(i18n);
app.use(createPinia());

app.mount("#app");
