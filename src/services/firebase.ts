// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para Firestore

const firebaseConfig = {
    apiKey: "AIzaSyCPmIz6t3qAG0OcnuaPom0oTfl_-4ZmWGI",
    authDomain: "notifyprov2.firebaseapp.com",
    projectId: "notifyprov2",
    storageBucket: "notifyprov2.appspot.com",
    messagingSenderId: "959589027128",
    appId: "1:959589027128:web:912e8aa95587d64563c5cd",
    measurementId: "G-D3MJNL2WD4"
  };
// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
