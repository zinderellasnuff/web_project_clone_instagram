import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase.js"
import iphoneProfile from "../../public/images/images_ig/iphone-with-profile.jpg"
import logo from "../../public/images/images_ig/logo.png"
import * as ROUTES from "../constans/routes.js"

const Login = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.log("error code", error.code);
      if (error.code === "auth/invalid-login-credentials" || error.code === "auth/invalid-credential") {
        setError("Las credenciales de inicio de sesión no son válidas")
      } else if (error.code === "auth/invalid-email") {
        setError("La dirreción de correo electrónico está mal escrita")
      } else {
        setError(error.message)
      }
      setEmailAddress("")
      setPassword("")
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram"
  }, []);

  return (

    <div className='container flex mx-auto max-w-screen-md max-w-screen items-center h-screen'>
      <div className="flex w-3/5">
        <img
          src={iphoneProfile}
          alt="Foto iPhone de la aplicacion Instragram"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="p-8 border border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src={logo}
              alt="Logo Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              arial-label="Ingresa tu Teléfono, usuario o correo electrónico"
              type="text"
              placeholder="Teléfono, usuario o correo electrónico"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              arial-label="Ingresa tu contraseña"
              type="password"
              placeholder="Contraseña"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}>
              Iniciar sesión
            </button>
            <div className="mt-8 mb-8 flex items-center justify-center space-x-4">
              <div className="w-full border-t border-gray-100"></div>
              <div className="flex justify-center items-center">o</div>
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div>
              <button>
                <span></span>
                <span>Iniciar sesión con Facebook</span>
              </button>
            </div>
            <a><span>¿Olvidaste tu contraseña?</span></a>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full
            bg-white p-6 rounded border border-gray-primary mt-4">
          <p>¿No tienes una cuenta?{" "}
            <Link className="text-[rgb(0,149,246)] font-semibold" to={ROUTES.SIGN_UP}>Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


