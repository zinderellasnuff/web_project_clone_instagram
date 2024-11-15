import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase"; // Si tienes una función para obtener más datos

const useUser = () => {
  const [activeUser, setActiveUser] = useState(null);
  const { user } = useContext(UserContext); // Obtenemos el usuario desde el contexto

  useEffect(() => {
    if (user && user.userId) { // Verifica si el usuario y su ID están disponibles
      const getUserObjByUserId = async () => {
        try {
          const [response] = await getUserByUserId(user.userId); // O usa user.uid si es necesario
          setActiveUser(response || {});
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      getUserObjByUserId();
    }
  }, [user]); // Solo se ejecuta cuando el 'user' cambia

  return { user: activeUser };
};

export default useUser;
