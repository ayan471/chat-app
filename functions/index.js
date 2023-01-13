const functions = require('firebase-functions');

const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://chat-web-app-40e34-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const { sendFcm } = require('./src/fcm');
exports.sendFcm = sendFcm;
