import { firebaseConfig } from '@/firebaseConfig'
// src/firebaseInit.ts
import { initializeApp } from 'firebase/app'
import {
  deleteToken,
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging'
import type { Messaging } from 'firebase/messaging'
import type { GetTokenOptions } from 'firebase/messaging/sw'

// Initialize Firebase Cloud Messaging
export class PushNotificationService {
  messaging: Messaging
  token: string | null = null
  constructor() {
    const firebaseApp = initializeApp(firebaseConfig)
    this.messaging = getMessaging(firebaseApp)
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  }

  isSubscribed() {
    return localStorage.getItem('notificationToken') !== null
  }

  async subscribe(options: GetTokenOptions) {
    this.token = await getToken(this.messaging, options)
    localStorage.setItem('notificationToken', this.token)
  }

  async unSubscribe() {
    await deleteToken(this.messaging)
    localStorage.removeItem('notificationToken')
  }
}
