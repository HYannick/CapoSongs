<template>
  <Modal @close="close">
    <div class="notification-modal p-22">
      <div class="notification-modal-header">
        <div class="icon-wrapper">
          <Icon name="bell" :size="40" />
        </div>
        <h2 class="text -heading -h2 -bold">
          {{ t("notificationModal.title") }}
        </h2>
      </div>
      <div class="notification-modal-body my-10">
        <p class="text -body">
          {{ t("notificationModal.description") }}
        </p>
        <ul class="notification-modal-perks mt-22">
          <li>
            <p class="text -body" v-html="t('notificationModal.perk_1')"></p>
          </li>
          <li>
            <p class="text -body" v-html="t('notificationModal.perk_2')"></p>
          </li>
        </ul>
        <p class="text -caption-1 text-sm -body mt-22">
          {{ t("notificationModal.disclaimer") }}
        </p>
      </div>
      <div class="notification-modal-footer">
        <button
          class="settings-button outline-color-black--200 background-color-black--50 color-black--950"
          @click="close"
        >
          {{ t("notificationModal.dismiss") }}
        </button>
        <button
          class="settings-button background-color-secondary--600 color-black--10"
          @click="enableNotifications"
        >
          {{ t("notificationModal.confirm") }}
        </button>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/common/Modal.vue";
import { useI18n } from "vue-i18n";
import Icon from "@/components/component-library/Icon.vue";
import { usePushNotifications } from "@/composables/usePushNotifications";
import { useAppStore } from "@/stores/app.store";
import { storeToRefs } from "pinia";
const { requestPermission } = usePushNotifications();
const { closeNotificationsModal } = useAppStore();
const { featuresVisibility } = storeToRefs(useAppStore());
const { t } = useI18n();
const close = () => {
  closeNotificationsModal();
  localStorage.setItem("notification-request-triggered", "true");
};

const enableNotifications = () => {
  requestPermission();
  closeNotificationsModal();
};
</script>
<style lang="scss">
.icon-wrapper {
  margin: 5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-secondary-300);
  width: 10rem;
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  &:before {
    position: absolute;
    content: "";
    display: block;
    z-index: -1;
    background: var(--color-secondary-100);
    width: 10rem;
    aspect-ratio: 1;
    border-radius: 50%;
    transform: scale(1.2);
  }
  svg path {
    stroke: var(--color-secondary-900);
  }
}
.notification-modal-perks {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
.notification-modal-footer {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
