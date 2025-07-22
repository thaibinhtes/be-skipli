const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");  

const firebaseConfig = {
  apiKey: "AIzaSyAaCJc1_lrnRIoC7yG7isfx15hVtRlgbcA",
  authDomain: "skipli-1081b.firebaseapp.com",
  projectId: "skipli-1081b",
  storageBucket: "skipli-1081b.firebasestorage.app",
  messagingSenderId: "557775919640",
  appId: "1:557775919640:web:d92568b5c22bc0ec3ec16d",
  measurementId: "G-959RGVD435"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  

module.exports = { auth, db };
