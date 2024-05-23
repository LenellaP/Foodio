// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd3jdqjGvynFSfP9FAzaEId5db61EbBIE",
  authDomain: "orders-9f9bd.firebaseapp.com",
  databaseURL: "https://orders-9f9bd-default-rtdb.firebaseio.com",
  projectId: "orders-9f9bd",
  storageBucket: "orders-9f9bd.appspot.com",
  messagingSenderId: "738275083435",
  appId: "1:738275083435:web:e9c9f754dfd64feebca3ee",
  measurementId: "G-CN4C7P95S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);