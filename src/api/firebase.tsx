/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import isDev from 'utils/environment';

function initializeApp() {
  firebase.initializeApp({
    authDomain: 'weight4it-staging.firebaseapp.com',
    projectId: 'weight4it-staging',
    storageBucket: 'weight4it-staging.appspot.com',
    messagingSenderId: '899998497268',
    appId: '1:899998497268:web:fa6d6bf5edf99c5794a1a1',
  });
}

if (!firebase.apps.length) {
  initializeApp();
} else {
  firebase.app(); // if already initialized, use that one
}

const functions = firebase.app().functions('europe-west1');

if (isDev()) {
  functions.useEmulator('localhost', 5000);
}

export default firebase;
