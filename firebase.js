// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnpMRQkOu0Vw1DI1y1Y8w6Ko_1Ken934k",
  authDomain: "warehouse-tracker-bf0d0.firebaseapp.com",
  projectId: "warehouse-tracker-bf0d0",
  storageBucket: "warehouse-tracker-bf0d0.appspot.com",
  messagingSenderId: "630826145921",
  appId: "1:630826145921:web:55137c906113c18a871580",
  measurementId: "G-6MJP8ZPZC4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
