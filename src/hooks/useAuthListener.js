import { useContext } from "react";
import { UserContext } from "../context/userProvider"; // Importar el contexto de usuario

const UseAuthListener = () => {
    const { user } = useContext(UserContext); // Obtener el usuario del contexto
    return { user }; // Retornar el usuario
};

export default UseAuthListener;
