<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useI18n } from 'vue-i18n'

const { needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  needRefresh.value = false
}

const { t } = useI18n()
</script>

<template>
  <div class="pwa-toast" :class="{ '-visible': needRefresh }" role="alert">
    <div class="message">
      <span class="text -body" v-html="t('pwaUpdate.updateReady')"> </span>
    </div>
    <div class="pwa-toast-footer">
      <button aria-label="dismiss reload" class="dismiss-reload" @click="close">
        {{ t("pwaUpdate.dismiss") }}
      </button>
      <button
        aria-label="reload pwa"
        class="reload-pwa"
        @click="updateServiceWorker()"
      >
        {{ t("pwaUpdate.reload") }}
      </button>
    </div>
  </div>
  <!--  TODO: to implement when offline enabled-->
  <!--  <div class="pwa-toast" :class="{ '-visible': offlineReady }" role="alert">-->
  <!--    <div class="message">-->
  <!--      <span class="text -body">-->
  <!--        {{ t("pwaUpdate.offlineReady") }}-->
  <!--      </span>-->
  <!--    </div>-->
  <!--    <div class="pwa-toast-footer">-->
  <!--      <button class="dismiss-offline" @click="close">-->
  <!--        {{ t("pwaUpdate.dismiss") }}-->
  <!--      </button>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style lang="scss">
.pwa-toast {
  position: fixed;
  right: 5rem;
  bottom: 0;
  left: 5rem;
  z-index: 999;
  text-align: center;
  margin: 1rem;
  box-shadow: 3px 4px 5px 0 var(--color-black-200);
  background: var(--color-secondary-600);
  padding: 0.5rem 0 1rem;
  border-radius: 1rem;
  opacity: 0;
  transform: translateY(10rem);
  transition: transform 0.7s cubic-bezier(0.83, 0, 0.17, 1),
    opacity 0.7s cubic-bezier(0.83, 0, 0.17, 1);

  span {
    color: var(--color-primary-300);
  }

  &.-visible {
    transform: translateY(0);
    opacity: 1;
  }
}

.pwa-toast-footer {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dismiss-reload {
  background: transparent;
  border: transparent;
  color: var(--color-primary-300);
  margin-right: 1rem;
  cursor: pointer;
}

.reload-pwa,
.dismiss-offline {
  background: #ffdab9;
  border: transparent;
  color: var(--color-secondary-600);
  padding: 1rem 3rem;
  border-radius: 4rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
