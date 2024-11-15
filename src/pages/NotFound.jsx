import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constans/routes.js"
import imageNotFound from "../../public/images/images_ig/image404.png"

const NotFound = () => {
  useEffect(() => {
    document.title = "Not found - instagram";
  }, [])

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center">
      {/* Contenedor de texto */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center px-4">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">Página no
          encontrada</p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-8">Lo sentimos, no se pudo encontrar la
          página que estás buscando.</p>

        {/* Botón de retorno */}
        <Link
          to="/login"
          className="mt-4 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-black px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <span>Regresar a la página de inicio</span>
        </Link>
      </div>

      {/* Imagen o área vacía */}
      <div className="w-full lg:w-1/2 lg:h-full flex items-center justify-center p-4">
        <img
          className=""
          src={imageNotFound}
          alt="Imagen NotFound 404"
        />
      </div>
    </div>
  );
}

export default NotFound;
