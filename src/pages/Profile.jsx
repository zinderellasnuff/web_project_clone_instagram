import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import Header from "../components/Header";
import * as ROUTES from "../constans/routes.js";
import UserProfile from "../components/profile/Index.jsx";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const user = await getUserByUsername(username); // Sin desestructurar, ya que getUserByUsername retorna un solo objeto o null
        if (user?.userId) {
          setUser(user);
        } else {
          navigate(ROUTES.NOT_FOUND);
        }
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    if (username) {
      checkUserExists();
    }
  }, [username, navigate]);

  // Mostrar un indicador de carga mientras se verifica el usuario
  if (loading) {
    return <div>Cargando...</div>;
  }

  return user ? (
      <div className="bg-gray-background">
        <Header />
        <div className="mx-auto max-w-screen-lg">
          <UserProfile user={user} />
        </div>
      </div>
  ) : null;
};

export default Profile;
