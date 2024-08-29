import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnsp6m9rueg3qRa4zy8D64Hb-219b14MY",
  authDomain: "frontend-app-98fa4.firebaseapp.com",
  projectId: "frontend-app-98fa4",
  storageBucket: "frontend-app-98fa4.appspot.com",
  messagingSenderId: "681123427704",
  appId: "1:681123427704:web:12d443ab65c1d65961c48d",
  measurementId: "G-JDBSM1Q7L1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
