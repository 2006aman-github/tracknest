// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqfKDkZ8pVH32e8f1KFosBf6ozfDyPbDM",
  authDomain: "tracknester.firebaseapp.com",
  projectId: "tracknester",
  storageBucket: "tracknester.firebasestorage.app",
  messagingSenderId: "512801659182",
  appId: "1:512801659182:web:1def2cdca20e3ab315c2bf",
  measurementId: "G-B003NTY353",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
