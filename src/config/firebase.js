// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsF5Ig07Os5frQDPssmZ3Uhqq2ox9vdTc",
  authDomain: "vite-contact-153e4.firebaseapp.com",
  projectId: "vite-contact-153e4",
  storageBucket: "vite-contact-153e4.appspot.com",
  messagingSenderId: "687832738219",
  appId: "1:687832738219:web:50576dfa157fb10979caee",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
