// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyAODl8iXuQiZv63i-vjfAngTN93IF8EIjY",
  authDomain: "instagram-d3308.firebaseapp.com",
  projectId: "instagram-d3308",
  storageBucket: "instagram-d3308.appspot.com",
  messagingSenderId: "590194569640",
  appId: "1:590194569640:web:185a330decb987ea45ed9d",
};

// Configurar la aplicación Firebase
const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

console.log("Firebase configurado con éxito");

export { app, auth, firestore };
