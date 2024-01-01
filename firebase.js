// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  //Add your firebase project config here.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
