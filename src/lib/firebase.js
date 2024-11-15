import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAODl8iXuQiZv63i-vjfAngTN93IF8EIjY",
  authDomain: "instagram-d3308.firebaseapp.com",
  projectId: "instagram-d3308",
  storageBucket: "instagram-d3308.firebasestorage.app",
  messagingSenderId: "590194569640",
  appId: "1:590194569640:web:185a330decb987ea45ed9d"
};

// Initialize Firebase
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// Add a default export
export default firebase;

// Export FieldValue as a named export
export { FieldValue };
