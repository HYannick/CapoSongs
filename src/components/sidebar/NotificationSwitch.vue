<template>
  <SwitchInput :checked="isSubscribed" @change="toggleNotifications" />
</template>
<script setup lang="ts">
import SwitchInput from '@/components/common/SwitchInput.vue'
import { usePushNotifications } from '@/composables/usePushNotifications'
import { useNotificationStore } from '@/stores/notification.store'

const { notify } = useNotificationStore()
const { requestPermission, revokePermission, isSubscribed } =
  usePushNotifications()

const toggleNotifications = async () => {
  if (isSubscribed.value) {
    await revokePermission()
    notify('popups.notification.deactivated', 'info')
  } else {
    await requestPermission().then((granted) => {
      if (!granted) {
        notify('popups.notification.manualActivation', 'info')
        return
      }
      notify('popups.notification.activated', 'success')
    })
  }
}
</script>
