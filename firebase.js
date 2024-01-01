// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  //Add your firebase's project configuration here.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
