import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ username }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white shadow-sm">
            {/* Contenedor de usuario */}
            <div className="flex items-center space-x-3">
                {/* Imagen de perfil */}
                <Link to={`/p/${username}`} className="flex items-center space-x-2">
                    <img
                        className="rounded-full h-10 w-10"
                        src={`/images/images_ig/avatars/${username}.jpg`}
                        onError={(e) => (e.target.src = "/images/images_ig/avatars/default.png")} // Imagen predeterminada
                        alt={`${username} foto de perfil`}
                    />
                    <p className="font-semibold text-lg">{username}</p>
                </Link>
            </div>
        </div>
    );
};

export default Header;

Header.propTypes = {
    username: PropTypes.string.isRequired,
};
