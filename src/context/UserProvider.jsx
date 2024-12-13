import { useState, useEffect } from "react";
import UserContext from "./user";
import { useFirebase } from "../hooks/useFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserByUserId } from "../services/firebase.js";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("authUser"));
    } catch (error) {
      console.error("Error al leer el usuario del localStorage:", error);
      return null;
    }
  });
  const [userData, setUserData] = useState(null);

  const { auth } = useFirebase();

  useEffect(() => {
    if (!auth) {
      console.error("El objeto auth es undefined");
      return;
    }

    const listener = onAuthStateChanged(
        auth,
        async (authUser) => {
          if (authUser) {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            setUser(authUser);

            // Obtener datos del usuario
            try {
              const userDetails = await getUserByUserId(authUser.uid);
              if (userDetails.length > 0) {
                setUserData(userDetails[0]);
              } else {
                console.error("No se encontraron datos para el usuario:", authUser.uid);
                setUserData(null);
              }
            } catch (error) {
              console.error("Error al obtener los detalles del usuario:", error);
            }
          } else {
            localStorage.removeItem("authUser");
            setUser(null);
            setUserData(null); // Limpiar los datos del usuario cuando no está autenticado
          }
        },
        (error) => {
          console.error("Error en onAuthStateChanged:", error);
        }
    );

    return () => listener();
  }, [auth]);

  return (
      <UserContext.Provider value={{ user, userData }}>
        {children}
      </UserContext.Provider>
  );
};

export default UserProvider;