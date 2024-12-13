import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { getUserByUserId, getPhotos } from "../services/firebase";

export const usePhotos = () => {
  const [photos, setPhotos] = useState(null);
  const userId = useUser()?.userData?.userId || ""; // Corregido

  useEffect(() => {
    async function getTimeLinePhotos() {
      try {
        const user = await getUserByUserId(userId); // Obtener datos del usuario
        const following = user[0]?.following || []; // Verificar si sigue a alguien

        if (following.length > 0) {
          const followedUserPhotos = await getPhotos(userId, following);

          // Ordenar las fotos por fecha
          const sortedPhotos = followedUserPhotos.sort(
              (a, b) => b.dateCreated - a.dateCreated
          );

          setPhotos(sortedPhotos);
        } else {
          console.log("El usuario no sigue a nadie. No hay fotos para mostrar.");
          setPhotos([]); // No hay fotos si no sigue a nadie
        }
      } catch (error) {
        console.error("Error en getTimeLinePhotos:", error);
        setPhotos([]); // Asegurar que se manejen errores devolviendo un array vacío
      }
    }

    if (userId) {
      getTimeLinePhotos();
    }
  }, [userId]);

  return { photos };
};