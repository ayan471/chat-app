/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyCQyAwWWF22M9uq5NGF7T6VJf3vUF0Efl4',
  authDomain: 'chat-web-app-40e34.firebaseapp.com',
  databaseURL:
    'https://chat-web-app-40e34-default-rtdb.asia-southeast1.firebasedatabase.app',

  projectId: 'chat-web-app-40e34',
  storageBucket: 'chat-web-app-40e34.appspot.com',
  messagingSenderId: '1021553549665',
  appId: '1:1021553549665:web:7b19605e64ea896e5b2520',
});

firebase.messaging();
