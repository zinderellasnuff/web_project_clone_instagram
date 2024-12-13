import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { app } from "../lib/firebaseConfig"; // Adjust the path based on your folder structure

// Initialize Firestore
const db = getFirestore(app);

export async function doesUsernameExist(username) {
  if (!username) {
    console.error("El valor de 'username' es inválido:", username);
    throw new Error("El valor de 'username' no puede ser undefined o vacío.");
  }

  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0;
  } catch (error) {
    console.error("Error en doesUsernameExist:", error);
    throw error;
  }
}

export async function getUserByUserId(userId) {
  if (!userId) {
    console.error("El valor de 'userId' es inválido:", userId);
    throw new Error("El valor de 'userId' no puede ser undefined o vacío.");
  }

  try {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
  } catch (error) {
    console.error("Error en getUserByUserId:", error);
    throw error;
  }
}

/**
 * Obtiene perfiles sugeridos excluyendo al usuario actual y a los ya seguidos.
 * @param {string} userId - ID del usuario actual.
 * @param {Array} following - Lista de IDs de usuarios que el usuario actual ya sigue.
 * @returns {Promise<Array>} - Lista de perfiles sugeridos.
 */
export async function getSuggestedProfiles(userId, following = []) {
  if (!userId) {
    console.error("El valor de 'userId' es inválido:", userId);
    throw new Error("El valor de 'userId' no puede ser undefined o vacío.");
  }

  try {
    // Consulta para obtener usuarios que no sean el usuario actual
    const q = query(
      collection(db, "users"),
      where("userId", "!=", userId) // Excluir al usuario actual
    );

    const querySnapshot = await getDocs(q);

    // Filtrar para excluir usuarios duplicados y los ya seguidos
    const suggestedProfiles = querySnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }))
      .filter(
        (profile, index, self) =>
          !following.includes(profile.userId) &&
          profile.userId !== userId &&
          index === self.findIndex((p) => p.userId === profile.userId) // Evitar duplicados
      );

    return suggestedProfiles;
  } catch (error) {
    console.error("Error en getSuggestedProfiles:", error);
    throw error;
  }
}

/**
 * Actualiza el array "following" del usuario logueado para seguir o dejar de seguir a otro usuario.
 * @param {string} loggedInDocId - ID del documento del usuario logueado.
 * @param {string} profileUserId - ID del usuario a seguir o dejar de seguir.
 * @param {boolean} remove - Indica si se debe eliminar (true) o agregar (false).
 * @returns {Promise<void>}
 */
export async function updateLoggedInUserFollowing(loggedInDocId, profileUserId, remove = false) {
  try {
    const userDocRef = doc(db, "users", loggedInDocId);
    await updateDoc(userDocRef, {
      following: remove
        ? arrayRemove(profileUserId) // Eliminar del array
        : arrayUnion(profileUserId), // Agregar al array
    });
    console.log(
      `Usuario actualizado: ${loggedInDocId} ${remove ? "ya no sigue a" : "ahora sigue a"
      } ${profileUserId}`
    );
  } catch (error) {
    console.error(`Error en updateLoggedInUserFollowing: ${error.message}`);
    throw error;
  }
}

/**
 * Actualiza el array "followers" del usuario seguido.
 * @param {string} spDocId - ID del documento del usuario seguido.
 * @param {string} userId - ID del usuario logueado (actual).
 * @param {boolean} remove - Indica si se debe eliminar (true) o agregar (false).
 * @returns {Promise<void>}
 */
export async function updateFollowedUserFollowers(spDocId, userId, remove = false) {
  try {
    const followedUserDocRef = doc(db, "users", spDocId);
    await updateDoc(followedUserDocRef, {
      followers: remove
        ? arrayRemove(userId) // Eliminar del array
        : arrayUnion(userId), // Agregar al array
    });
    console.log(
      `Usuario actualizado: ${spDocId} ${remove ? "ha perdido al seguidor" : "tiene como nuevo seguidor"
      } ${userId}`
    );
  } catch (error) {
    console.error(`Error en updateFollowedUserFollowers: ${error.message}`);
    throw error;
  }
}

export async function getPhotos(userId, following) {
  if (!userId || !following || following.length === 0) {
    console.error("Parámetros inválidos en getPhotos:", { userId, following });
    return [];
  }

  try {
    const q = query(
        collection(db, "photos"),
        where("userId", "in", following) // Buscar fotos de los usuarios seguidos
    );

    const querySnapshot = await getDocs(q);

    // Formatear los datos obtenidos
    const photos = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));

    return photos;
  } catch (error) {
    console.error("Error en getPhotos:", error);
    throw error;
  }
}

/**
 * Obtiene un usuario por su nombre de usuario (username).
 * @param {string} username - Nombre de usuario a buscar.
 * @returns {Promise<object|null>} - Retorna el usuario encontrado o `null` si no existe.
 */
export async function getUserByUsername(username) {
  if (!username) {
    console.error("El valor de 'username' es inválido:", username);
    throw new Error("El valor de 'username' no puede ser undefined o vacío.");
  }

  try {
    // Crear una consulta para buscar el username
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);

    // Si no hay resultados, retornar null
    if (querySnapshot.empty) {
      console.warn(`Usuario con username '${username}' no encontrado.`);
      return null;
    }

    // Retornar el primer usuario encontrado (debería ser único)
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }))[0];
  } catch (error) {
    console.error("Error en getUserByUsername:", error);
    throw error;
  }
}

/**
 * Obtiene todas las fotos de un usuario específico desde la base de datos.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array>} - Una lista de objetos que representan las fotos del usuario.
 * @throws {Error} - Si ocurre un error al obtener las fotos o el userId no es válido.
 */
export async function getUserPhotosByUserId(userId) {
  if (!userId || typeof userId !== "string") {
    console.error("El valor de 'userId' es inválido:", userId);
    throw new Error("El valor de 'userId' no puede estar vacío y debe ser un string.");
  }

  try {
    // Crea la consulta para obtener las fotos del usuario con el userId dado
    const photosQuery = query(collection(db, "photos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(photosQuery);

    // Mapea los documentos obtenidos a un array de objetos con los datos y `docId`
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
  } catch (error) {
    console.error("Error al obtener las fotos del usuario con userId:", userId, error);
    throw new Error("No se pudieron obtener las fotos del usuario. Intenta nuevamente.");
  }
}

/**
 * Alterna el estado de seguimiento entre dos usuarios.
 * @param {string} loggedInDocId - ID del documento del usuario logueado.
 * @param {string} profileDocId - ID del documento del usuario a seguir o dejar de seguir.
 * @returns {Promise<void>}
 */
export async function toggleFollow(loggedInDocId, profileDocId) {
  if (!loggedInDocId || !profileDocId) {
    console.error("Los parámetros 'loggedInDocId' o 'profileDocId' son inválidos.");
    throw new Error("Ambos parámetros deben ser proporcionados.");
  }

  try {
    // Referencias a los documentos de usuario
    const loggedInUserDocRef = doc(db, "users", loggedInDocId);
    const profileUserDocRef = doc(db, "users", profileDocId);

    // Obtener los datos del usuario logueado
    const loggedInUserDoc = await getDoc(loggedInUserDocRef);
    if (!loggedInUserDoc.exists()) {
      console.error(`Usuario logueado con ID '${loggedInDocId}' no encontrado.`);
      throw new Error(`Usuario logueado con ID '${loggedInDocId}' no encontrado.`);
    }

    // Obtener los datos del usuario objetivo (perfil)
    const profileUserDoc = await getDoc(profileUserDocRef);
    if (!profileUserDoc.exists()) {
      console.error(`Usuario objetivo con ID '${profileDocId}' no encontrado.`);
      throw new Error(`Usuario objetivo con ID '${profileDocId}' no encontrado.`);
    }

    // Obtener los arrays actuales
    const loggedInUserData = loggedInUserDoc.data();
    const profileUserData = profileUserDoc.data();

    const isFollowing = loggedInUserData.following?.includes(profileDocId);

    // Actualizar los arrays en Firestore
    if (isFollowing) {
      // Dejar de seguir
      await updateDoc(loggedInUserDocRef, {
        following: arrayRemove(profileDocId),
      });
      await updateDoc(profileUserDocRef, {
        followers: arrayRemove(loggedInDocId),
      });
      console.log(`El usuario ${loggedInDocId} ya no sigue a ${profileDocId}`);
    } else {
      // Comenzar a seguir
      await updateDoc(loggedInUserDocRef, {
        following: arrayUnion(profileDocId),
      });
      await updateDoc(profileUserDocRef, {
        followers: arrayUnion(loggedInDocId),
      });
      console.log(`El usuario ${loggedInDocId} ahora sigue a ${profileDocId}`);
    }
  } catch (error) {
    console.error("Error en toggleFollow:", error);
    throw error;
  }
}

/**
 * Verifica si un usuario está siguiendo a otro.
 *
 * @param {string} loggedInUserUsername - El nombre de usuario del usuario logueado.
 * @param {string} profileUserId - El ID del perfil del usuario que queremos verificar.
 * @returns {Promise<boolean>} - Retorna `true` si el usuario está siguiendo al perfil, de lo contrario `false`.
 */
export const isUserFollowingProfile = async (loggedInUserUsername, profileUserId) => {
  try {
    // Obtén el documento del usuario logueado
    const userDocRef = doc(db, "users", loggedInUserUsername);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      // Verifica si el campo "following" contiene el ID del perfil
      return userData.following && userData.following.includes(profileUserId);
    } else {
      console.warn(`No se encontró el usuario con el username: ${loggedInUserUsername}`);
      return false;
    }
  } catch (error) {
    console.error("Error al verificar si el usuario está siguiendo al perfil:", error);
    return false;
  }
};