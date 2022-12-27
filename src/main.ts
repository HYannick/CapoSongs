import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "./assets/main.scss";
import { i18n } from "@/i18n";
import { MotionPlugin } from "@vueuse/motion";
import { registerSW } from 'virtual:pwa-register'
import Toastify from 'toastify-js';
if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location) && !/lvh.me/.test(window.location)) {
  const updateSW = registerSW({
    onNeedRefresh() {
      Toastify({
        text: `<h4 style='display: inline'>An update is available!</h4>
               <br><br>
               <a class='do-sw-update'>Click to update and reload</a>  `,
        escapeMarkup: false,
        gravity: "bottom",
        onClick() {
          updateSW(true);
        }
      }).showToast();
    }
  });
}

const app = createApp(App);

app.use(MotionPlugin)
app.use(i18n);
app.use(createPinia());

app.mount("#app");
