// lib/firebaseClient.ts

import { initializeApp, getApps, getApp } from "firebase/app";
// If you need Firestore, keep it
import { getFirestore } from "firebase/firestore";
// For Realtime Database, import this:
import { getDatabase } from "firebase/database";

// Your *public* Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAFXEd7RtqNJbjtPEvKxFHu7HFgODPfUtY",
  authDomain: "pp-pulse-check-demo.firebaseapp.com",
  projectId: "pp-pulse-check-demo",
  storageBucket: "pp-pulse-check-demo.firebasestorage.app",
  messagingSenderId: "608594350905",
  appId: "1:608594350905:web:45e726fb19c98b4843cee8",
  measurementId: "G-RQL7EMP6RX"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// If you want Realtime Database:
const database = getDatabase(app);

// Now export them. 
export { app, database };
