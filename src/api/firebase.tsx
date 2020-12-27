import firebase from 'firebase/app';
import 'firebase/auth';

function initializeApp() {
  firebase.initializeApp({
    apiKey: 'AIzaSyCdd717G9x67acebK4g1wSW9a9ZlmCAxwA',
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

export default firebase;
