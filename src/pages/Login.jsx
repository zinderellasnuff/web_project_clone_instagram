import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../hooks/useFirebase";
import iphoneProfile from "../../public/images/images_ig/iphone-with-profile.jpg";
import logo from "../../public/images/images_ig/logo.png";
import * as ROUTES from "../constans/routes";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const { auth } = useFirebase();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Firebase authentication login (modular)
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD); // Navegar al dashboard después del login exitoso
    } catch (error) {
      // Manejar errores de autenticación
      console.error("Error al iniciar sesión:", error.code);
      switch (error.code) {
        case "auth/user-not-found":
          setError("No se encontró un usuario con este correo electrónico.");
          break;
        case "auth/wrong-password":
          setError("La contraseña es incorrecta.");
          break;
        case "auth/invalid-email":
          setError("La dirección de correo electrónico no es válida.");
          break;
        default:
          setError("Ocurrió un error al intentar iniciar sesión.");
      }

      // Limpiar los campos en caso de error
      setEmailAddress("");
      setPassword("");
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram"; // Cambiar el título de la página
  }, []);

  return (
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        {/* Imagen del lado izquierdo */}
        <div className="flex w-3/5">
          <img
              src={iphoneProfile}
              alt="Foto de un iPhone mostrando Instagram"
              className="max-w-full"
          />
        </div>

        {/* Formulario de inicio de sesión */}
        <div className="flex flex-col w-2/5">
          <div className="p-8 border border-gray-primary bg-white">
            <h1 className="flex justify-center w-full">
              <img src={logo} alt="Logo de Instagram" className="mt-2 w-6/12 mb-4" />
            </h1>

            {/* Mensaje de error */}
            {error && <p className="text-xs text-red-primary mb-4">{error}</p>}

            <form onSubmit={handleLogin} method="POST">
              {/* Campo de correo electrónico */}
              <input
                  aria-label="Ingresa tu correo electrónico"
                  type="email"
                  placeholder="Correo electrónico"
                  className="text-sm text-gray-base w-full py-5 px-4 mb-2 border border-gray-primary rounded"
                  onChange={({ target }) => setEmailAddress(target.value)}
                  value={emailAddress}
              />

              {/* Campo de contraseña */}
              <input
                  aria-label="Ingresa tu contraseña"
                  type="password"
                  placeholder="Contraseña"
                  className="text-sm text-gray-base w-full py-5 px-4 mb-2 border border-gray-primary rounded"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
              />

              {/* Botón de inicio de sesión */}
              <button
                  type="submit"
                  disabled={isInvalid}
                  className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                      isInvalid && "opacity-50"
                  }`}
              >
                Iniciar sesión
              </button>

              {/* Línea divisoria */}
              <div className="mt-8 mb-8 flex items-center justify-center space-x-4">
                <div className="w-full border-t border-gray-300"></div>
                <p className="text-sm text-gray-base">O</p>
                <div className="w-full border-t border-gray-300"></div>
              </div>

              {/* Botón de inicio de sesión con Facebook */}
              <button
                  type="button"
                  className="w-full bg-blue-facebook text-white py-2 rounded text-sm font-bold"
              >
                Iniciar sesión con Facebook
              </button>

              {/* Enlace para recuperar contraseña */}
              <p className="text-sm text-blue-medium text-center mt-4 cursor-pointer">
                ¿Olvidaste tu contraseña?
              </p>
            </form>
          </div>

          {/* Redirección a registro */}
          <div className="flex justify-center items-center flex-col w-full bg-white p-6 rounded border border-gray-primary mt-4">
            <p className="text-sm">
              ¿No tienes una cuenta?{" "}
              <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Login;