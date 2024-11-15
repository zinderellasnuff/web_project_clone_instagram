import firebase from "../lib/firebase"; // Correct import


export async function doesUsernameExist(username) {
  if (!username) {
    console.error("El valor de 'username' es inválido:", username);
    throw new Error("El valor de 'username' no puede ser undefined o vacío.");
  }

  try {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();

    return result.docs.map((user) => user.data().length > 0);
  } catch (error) {
    console.error("Error en doesUsernameExist:", error);
    throw error; // Re-throw para manejarlo a nivel superior
  }
}


export async function getUserByUserId(userId) {
  if (!userId) {
    console.error("El valor de 'userId' es inválido:", userId);
    throw new Error("El valor de 'userId' no puede ser undefined o vacío.");
  }

  try {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("userId", "==", userId)  // Aquí estamos usando 'userId', que es lo que tienes en tu estructura
        .get();

    const user = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    return user;
  } catch (error) {
    console.error("Error en getUserByUserId:", error);
    throw error;
  }
}


