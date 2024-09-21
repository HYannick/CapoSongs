<template>
  <SwitchInput :checked="isSubscribed" @change="toggleNotifications" />
</template>
<script setup lang="ts">
import SwitchInput from "@/components/common/SwitchInput.vue";
import { useNotifications } from "@/composables/usePushNotifications";
const { requestPermission, revokePermission, isSubscribed } =
  useNotifications();

const toggleNotifications = async () => {
  if (isSubscribed.value) {
    await revokePermission();
  } else {
    await requestPermission().then((granted) => {
      if (!granted) {
        console.log("you need to turn on the notifications");
      }
    });
  }
};
</script>
