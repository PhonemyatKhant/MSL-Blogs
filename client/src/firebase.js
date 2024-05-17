// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "msl-blogs.firebaseapp.com",
    projectId: "msl-blogs",
    storageBucket: "msl-blogs.appspot.com",
    messagingSenderId: "186489831564",
    appId: "1:186489831564:web:4b1db9f958b99b72a1bba9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);