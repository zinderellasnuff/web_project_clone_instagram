import { useContext } from "react";
import FirebaseContext from "../context/firebase";

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase debe usarse dentro de un FirebaseProvider");
  }
  return context;
};