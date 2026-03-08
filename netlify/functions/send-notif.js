const admin = require('firebase-admin');

// Inisialisasi Firebase Admin menggunakan Environment Variables (Kunci Rahasia Netlify)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      // Replace memastikan format baris baru (enter) pada Private Key terbaca benar oleh server
      privateKey: process.env.FB_PRIVATE_KEY ? process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    }),
  });
}

exports.handler = async (event) => {
  // Hanya izinkan metode POST
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { token, title, body } = JSON.parse(event.body);

    const message = {
      notification: { title, body },
      token: token,
    };

    // Tembak notifikasi ke HP pengguna
    await admin.messaging().send(message);
    
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
