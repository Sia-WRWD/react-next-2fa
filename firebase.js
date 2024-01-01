// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCwh6vGQxizTlUQzvVEuS_uTo14XJakwIQ",
    authDomain: "react-2fa-test.firebaseapp.com",
    projectId: "react-2fa-test",
    storageBucket: "react-2fa-test.appspot.com",
    messagingSenderId: "833431621680",
    appId: "1:833431621680:web:04c31b39f983a3c1e21df5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
