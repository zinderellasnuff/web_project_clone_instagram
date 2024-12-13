import React, { useEffect } from "react";
import { app, auth, firestore } from "../lib/firebaseConfig.js";
import FirebaseContext from "./firebase.js";
import { seedDatabase } from "../seed.js";
import { collection, getDocs } from "firebase/firestore";

const FirebaseProvider = ({ children }) => {
  useEffect(() => {
    const seedIfEmpty = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, "users"));
        if (usersSnapshot.empty) {
          console.log("No hay datos en la colección, ejecutando seedDatabase...");
          await seedDatabase(firestore);
          console.log("seedDatabase ejecutado con éxito");
        } else {
          console.log("Los datos ya existen, no se ejecutará seedDatabase.");
        }
      } catch (error) {
        console.error("Error al verificar o ejecutar seedDatabase:", error);
      }
    };

    seedIfEmpty();
  }, []);

  const firebaseValue = { app,  auth, firestore };

  return (
      <FirebaseContext.Provider value={firebaseValue}>
        {children}
      </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
