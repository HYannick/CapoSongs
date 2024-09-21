<template>
  <div class="notifications">
    <transition-group name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="notification.type"
      >
        <span class="status-dot" :class="notification.type" />
        <span class="text">{{ t(notification.message) }}</span>
        <IconButton
          icon-name="close"
          :size="12"
          @click="remove(notification.id)"
        />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotificationStore } from "@/stores/notification.store";
import IconButton from "@/components/component-library/IconButton.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { removeNotification } = useNotificationStore();
const { notifications } = storeToRefs(useNotificationStore());

function remove(id: number) {
  removeNotification(id);
}
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification {
  background-color: var(--color-black-10);
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;

  .status-dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .text {
    line-height: 1;
  }

  &.success {
    background-color: var(--color-system-green-light);
    border: 1px solid var(--color-system-green);

    span {
      color: var(--color-system-green-dark);
    }

    .status-dot {
      background-color: var(--color-system-green);
    }
  }

  &.error {
    background-color: var(--color-system-red-light);
    border: 1px solid var(--color-system-red);

    span {
      color: var(--color-system-red-dark);
    }

    .status-dot {
      background-color: var(--color-system-red);
    }
  }

  &.info {
    background-color: var(--color-system-blue-light);
    border: 1px solid var(--color-system-blue);

    span {
      color: var(--color-system-blue-dark);
    }

    .status-dot {
      background-color: var(--color-system-blue);
    }
  }
}

.status-dot.success {
  background-color: var(--color-system-green);
}

.status-dot.error {
  background-color: var(--color-system-red);
}

.status-dot.info {
  background-color: var(--color-system-blue);
}

.notification button {
  background: none;
  border: none;
  margin-left: auto;
  cursor: pointer;
  font-size: 16px;
}

.notification {
  transition: opacity 0.3s cubic-bezier(0.83, 0, 0.17, 1),
  transform 0.3s cubic-bezier(0.83, 0, 0.17, 1);
  transform: translateX(0);
  opacity: 1;
}

.notification-enter-active,
.notification-leave-active {
  transition: opacity 0.3s cubic-bezier(0.83, 0, 0.17, 1),
  transform 0.3s cubic-bezier(0.83, 0, 0.17, 1);
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(3rem);
}
</style>
