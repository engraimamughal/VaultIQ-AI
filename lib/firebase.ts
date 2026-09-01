import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "vaultiq-ai.firebaseapp.com",
  projectId: "vaultiq-ai",
  storageBucket: "vaultiq-ai.firebasestorage.app",
  messagingSenderId: "444800321203",
  appId: "1:444800321203:web:a11d1a62ea33c3138b92c6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);