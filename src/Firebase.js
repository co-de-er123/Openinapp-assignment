// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnsp6m9rueg3qRa4zy8D64Hb-219b14MY",
  authDomain: "frontend-app-98fa4.firebaseapp.com",
  projectId: "frontend-app-98fa4",
  storageBucket: "frontend-app-98fa4.appspot.com",
  messagingSenderId: "681123427704",
  appId: "1:681123427704:web:12d443ab65c1d65961c48d",
  measurementId: "G-JDBSM1Q7L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);