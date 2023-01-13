import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyCQyAwWWF22M9uq5NGF7T6VJf3vUF0Efl4',
  authDomain: 'chat-web-app-40e34.firebaseapp.com',
  databaseURL:
    'https://chat-web-app-40e34-default-rtdb.asia-southeast1.firebasedatabase.app',

  projectId: 'chat-web-app-40e34',
  storageBucket: 'chat-web-app-40e34.appspot.com',
  messagingSenderId: '1021553549665',
  appId: '1:1021553549665:web:7b19605e64ea896e5b2520',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    'BJpO3oc9P9TnHohM3e6qEZArSGjikiF0LaRHcgv0dt2fN0qKILaXiuGjGEUZGv3vrMu5viVBUZX9OSszkEb2stw'
  );
  messaging.onMessage(data => {
    console.log(data);
  });
}
