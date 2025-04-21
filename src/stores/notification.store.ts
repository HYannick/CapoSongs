import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[],
    idCounter: 0,
  }),
  actions: {
    notify(message: string, type: 'success' | 'error' | 'info' = 'info') {
      const id = this.idCounter++
      this.notifications.push({ id, message, type })

      setTimeout(() => {
        this.removeNotification(id)
      }, 3000)
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
  },
})

interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}
