
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

  // 1️⃣ הגדרת Firebase config
const firebaseConfig = {
    apiKey: "AKfycbxrEZL_otwjij_c3Wif8mWmxjtK-Ut6GWKNnt17NZkP9Kb32eDc-9sKg3FSWREfLYhm",
    authDomain: "hsaban94-cc777.firebaseapp.com",
    projectId: "hsaban94-cc777",
    storageBucket: "hsaban94-cc777.appspot.com",
    messagingSenderId: "299206369469",
    appId: "1:299206369469:web:7527baa329def3a29457d4"
};

  // 2️⃣ אתחול אפליקציה
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  // 3️⃣ הרשמת Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/apps/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('FCM Service Worker registered with scope:', registration.scope);

        // 4️⃣ בקשת FCM token אחרי הרשמה
        requestFCMToken(registration);
      })
      .catch((err) => {
        console.error('FCM SW registration failed:', err);
      });
  }

  // 5️⃣ פונקציה לבקשת token ושמירתו
  async function requestFCMToken(registration) {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: "YOUR_PUBLIC_VAPID_KEY",
        serviceWorkerRegistration: registration
      });

      if (currentToken) {
        console.log('FCM Token:', currentToken);
        localStorage.setItem('saban_fcm_token', currentToken);

        // כאן אפשר לשלוח את ה-token לשרת/גיליון Google Sheets שלך
      } else {
        console.warn('No registration token available. Request permission to generate one.');
      }
    } catch (err) {
      console.error('Error retrieving FCM token:', err);
    }
  }
</script>
