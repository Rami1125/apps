import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

const messaging = getMessaging(firebaseApp);

navigator.serviceWorker.register('/apps/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('FCM Service Worker registered:', registration.scope);

    // בקשת token עם Service Worker מותאם
    return getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY_HERE', serviceWorkerRegistration: registration });
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      // שמירה ב-localStorage או שליחה לשרת
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  })
  .catch((err) => {
    console.error('An error occurred while retrieving token.', err);
  });

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
    apiKey: "AKfycbxrEZL_otwjij_c3Wif8mWmxjtK-Ut6GWKNnt17NZkP9Kb32eDc-9sKg3FSWREfLYhm",
    authDomain: "hsaban94-cc777.firebaseapp.com",
    projectId: "hsaban94-cc777",
    storageBucket: "hsaban94-cc777.appspot.com",
    messagingSenderId: "299206369469",
    appId: "1:299206369469:web:7527baa329def3a29457d4"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

console.log('Firebase Messaging Service Worker initialized');

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/firebase-logo.png' // A default icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
