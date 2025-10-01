

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_hAR_5Orzu1UzJitghregfNKlQRSBhKw",
  authDomain: "tasks-f3a4a.firebaseapp.com",
  projectId: "tasks-f3a4a",
  storageBucket: "tasks-f3a4a.firebasestorage.app",
  messagingSenderId: "557182673705",
  appId: "1:557182673705:web:56d8f16aa2b3201a4b0d38",
  measurementId: "G-0DLVCCNNQQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
