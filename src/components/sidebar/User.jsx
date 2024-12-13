import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Importa estilos para Skeleton

const User = ({ username = "Default Username", fullName = "Default Full Name" }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/images_ig/avatars/${username}.jpg`}
          alt={username || "User avatar"}
          onError={(e) => (e.target.src = "/images/images_ig/avatars/default.png")}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm text-gray-500">{fullName}</p>
      </div>
    </Link>
  );

User.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};

export default User;
