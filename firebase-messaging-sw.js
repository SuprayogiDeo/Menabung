importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Konfigurasi harus sama persis dengan yang di index.html
firebase.initializeApp({
    apiKey: "AIzaSyDUPTlI50-ZrTwokK9A9S7MJr5iCmqqyT4",
    authDomain: "tabungan-bersama-e48da.firebaseapp.com",
    projectId: "tabungan-bersama-e48da",
    storageBucket: "tabungan-bersama-e48da.firebasestorage.app",
    messagingSenderId: "984749032676",
    appId: "1:984749032676:web:eee0cff2200445e927d8f1"
});

const messaging = firebase.messaging();

// Menampilkan notifikasi saat aplikasi di latar belakang
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Pesan latar belakang diterima: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
