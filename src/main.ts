import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import VueGtag from "vue-gtag";
import "./assets/main.scss";
import { i18n } from "@/lang/i18n";
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);
app.use(MotionPlugin);
app.use(i18n);
app.use(createPinia());
app.use(VueGtag, {
  bootstrap: false,
  config: { id: import.meta.env.VITE_G4_ID },
});

app.mount("#app");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { type: "module", scope: "/" })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
