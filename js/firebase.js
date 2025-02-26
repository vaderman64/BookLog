// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDOYIGAOdyg9XlhF1kYkX3tJno8Q51DyA",
  authDomain: "booklog-1201b.firebaseapp.com",
  projectId: "booklog-1201b",
  storageBucket: "booklog-1201b.firebasestorage.app",
  messagingSenderId: "284319497284",
  appId: "1:284319497284:web:43b06610b3d9721b7b1011",
  measurementId: "G-FHK3FN1H1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider, signInWithPopup};