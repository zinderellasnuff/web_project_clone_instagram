import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import FirebaseProvider from "./context/FirebaseProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";
import "./index.css";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <FirebaseProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </FirebaseProvider>
    </StrictMode>
);
