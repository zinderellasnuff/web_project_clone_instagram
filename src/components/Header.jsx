import { useFirebase } from "../hooks/useFirebase";
import { useUser } from "../hooks/useUser";
import {Link, useNavigate} from "react-router-dom";
import * as ROUTES from "../constans/routes";
import logo from "../../public/images/images_ig/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useFirebase(); // Accedemos al objeto auth
  const { user, userData } = useUser(); // Accedemos al usuario autenticado

  if (!user || !userData) {
    return <p>Loading...</p>; // Mostramos un mensaje de carga
  }

  const handleSignOut = async () => {
    try {
      if (auth) {
        await auth.signOut(); // Ahora usamos auth como un objeto
        console.log("Sesión cerrada exitosamente");
        navigate(ROUTES.LOGIN);
      } else {
        console.error("Firebase o auth no están disponibles.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
      <header className="h-16 bg-white border-b border-gray-primary mb-8">
        <div className="container mx-auto max-w-screen-lg h-full">
          <div className="flex justify-between h-full">
            {/* Logo Section */}
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
              <h1 className="flex justify-center w-full">
                <Link to={ROUTES.DASHBOARD}>
                  <img
                      className="mt-2 w-6/12"
                      src={logo}
                      alt="Logo de Instagram"
                  />
                </Link>
              </h1>
            </div>
            {/* User Actions Section */}
            <div className="text-gray-700 text-center flex items-center align-items">
              {userData ? (
                  <>
                    {/* Home Icon */}
                    <Link to={ROUTES.DASHBOARD}>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 mr-6 text-black-light"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12 8.954 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                      </svg>
                    </Link>
                    {/* Sign Out Button */}
                    <button
                        type="button"
                        title="Sign out"
                        onClick={handleSignOut}
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 mr-6 text-black-light"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                    </button>
                    {/* User Profile Avatar */}
                    <div className="flex items-center cursor-pointer">
                      <Link to={`/p/${userData.username}`}>
                        <img
                            className="rounded-full h-8 w-8 flex"
                            src={`/images/images_ig/avatars/${userData.username}.jpg`}
                            alt={`${userData.fullName} perfil`}
                            onError={(e) => (e.target.src = "/images/images_ig/avatars/default.png")}
                        />
                      </Link>
                    </div>
                  </>
              ) : (
                  <>
                    <Link to={ROUTES.LOGIN}>
                      <button
                          className="bg-blue-medium font-bold text-bold text-sm rounded text-white w-20 h-8"
                          type="button"
                      >
                        Iniciar sesión
                      </button>
                    </Link>
                    <Link to={ROUTES.SIGN_UP}>
                      <button
                          className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                          type="button"
                      >
                        Regístrate
                      </button>
                    </Link>
                  </>
              )}
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;