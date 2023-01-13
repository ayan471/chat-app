/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable comma-spacing */
// eslint-disable-next-line quotes
const functions = require('firebase-functions');

const admin = require('firebase-admin');
const { transformToArr } = require('../../src/misc/helper');

const database = admin.database();
const messaging = admin.messaging();

exports.sendFcm = functions.https.onCall(async (data, context) => {
  checkIfAuth(context);
  const { chatId, title, message } = data;
  const roomSnap = await database.ref(`/rooms/${chatId}`).once('value');
  if (!roomSnap.exists()) {
    return false;
  }
  const roomData = roomData.val();
  checkIfAllowed(context, transformToArr(roomData.admins));
  const fcmUsers = transformToArr(roomData.fcmUsers);
  const userTokensPromises = fcmUsers.map(uid => getUserTokens(uid));
  const userTokenResult = await Promise.all(userTokensPromises);
  const tokens = userTokenResult.reduce(
    (accTokens, userTokens) => [...accTokens, ...userTokens],
    []
  );
  if (tokens.length === 0) {
    return false;
  }
  const fcmMessage = {
    notification: {
      title: `${title} (${roomData.name})`,
      body: message,
    },
    tokens: registrationTokens,
  };
  const batchResponse = await messaging.sendMulticast(fcmMessage);
  const failedTokens = [];

  if (batchResponse.failureCount > 0) {
    batchResponse.responses.forEach((resp, idx) => {
      if (!resp.success) {
        failedTokens.push(registrationTokens[idx]);
      }
    });
  }
  const removePromises = failedTokens.map(token =>
    database.ref(`/fcm_tokens/${token}`).remove()
  );
  return Promise.all(removePromises).catch(err => err.message);
});

function checkIfAuth(context) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You have to be signed in'
    );
  }

  function checkIfAllowed(context, chatAdmins) {
    if (!chatAdmins.includes(context.auth.uid)) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Restricted access'
      );
    }
  }

  function transformToArr(snapVal) {
    return snapVal ? Object.keys(snapVal) : [];
  }
}

async function getUserTokens(uid) {
  const userTokenSnap = await database
    .ref('/fcm_tokens')
    .orderByValue()
    .equalTo(uid)
    .once('value');
  if (!userTokenSnap.hasChildren()) {
    return [];
  }
  return Object.keys(userTokenSnap.val());
}
