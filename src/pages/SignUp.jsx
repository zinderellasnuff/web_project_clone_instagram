import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase.js"
import iphoneProfile from "../../public/images/images_ig/iphone-with-profile.jpg"
import logo from "../../public/images/images_ig/logo.png"
import * as ROUTES from "../constans/routes.js"
import { doesUsernameExist } from "../services/firebase.js";


const SignUp = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "" || username === "" || fullName === "";

  const handleSignUp = async (event) => {
    event.preventDefault();
    const userNameExists = await doesUsernameExist(username);

    if (!userNameExists.length) {
      try {
        const createdUserResult = await firebase.auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username
        })

        await firebase.firestore().collection("user").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now()
        })
        navigate(ROUTES.DASHBOARD)

      } catch (error) {
        if (error.code === "auth/weak-password") {
          setError("La contraseña debe tener al menos 6 caracteres")
        } else if (error.code === "auth/email-already-in-use") {
          setError("La dirección de correo electrónico ya está siendo utilizada por otra cuenta")
        }
        else if (error.code === "auth/invalid-email") {
          setError("La dirreción de correo electrónico está mal escrita")
        } else {
          setError(error.message)
        }
      }
      setFullName("")
      setEmailAddress("")
      setPassword("")
    } else {
      setError("Ese usuario ya está tomado, prueba con otro.")
    }
  };

  useEffect(() => {
    document.title = "SignUp - Instagram"
  }, []);

  return (

    <div className='pt-6 container flex mx-auto max-w-screen-md max-w-screen justify-center h-screen'>
      <div className="h-1/2 w-1/2 flex flex-col">
        <div className="p-8 border border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src={logo}
              alt="Logo Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          <div>
            <p>Regístrate para ver fotos y videos de tus amigos.</p>
          </div>
          <div>
            <button>
              <span></span>
              <span>Iniciar sesión con Facebook</span>
            </button>
          </div>
          <div className="mt-8 mb-8 flex items-center justify-center space-x-4">
            <div className="w-full border-t border-gray-100"></div>
            <div className="flex justify-center items-center">o</div>
            <div className="w-full border-t border-gray-100"></div>
          </div>
          {error && <p className="text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST">
            <input
              arial-label="Número de celular o correo electrónico"
              type="text"
              placeholder="Número de celular o correo electrónico"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              arial-label="Contraseña"
              type="password"
              placeholder="Contraseña"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <input
              aria-label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              arial-label="Nombre de usuario"
              type="text"
              placeholder="Nombre de usuario"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}>
              Resgistrate
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full
            bg-white p-6 rounded border border-gray-primary mt-4">
          <p>¿Tienes una cuenta?{" "}
            <Link className="text-[rgb(0,149,246)] font-semibold" to={ROUTES.LOGIN}>Incia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


