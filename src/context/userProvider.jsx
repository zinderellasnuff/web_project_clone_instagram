import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Asegúrate de tener la configuración de Firebase correctamente

// Crear el contexto de usuario
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth(); // Inicializar Firebase Auth
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser({
                    userId: authUser.uid,
                    username: authUser.displayName,
                    email: authUser.email,
                });
            } else {
                setUser(null); // Si el usuario no está autenticado, establece como null
            }
        });

        return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
