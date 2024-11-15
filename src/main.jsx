import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FirebaseContext from "./context/firebase.js"
import firebase, { FieldValue } from "./lib/firebase.js";
import "./index.css";


createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
)
