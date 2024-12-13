import PropTypes from "prop-types";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

const SuggestedProfile = ({ profileUserId, spDocId, username, fullName, userId, loggedInDocId }) => {
  const [followed, setFollowed] = useState(false); // Estado para manejar si seguimos al usuario
  const [loadingFollow, setLoadingFollow] = useState(false); // Estado de carga para la acción de seguir/dejar de seguir

  async function handleFollowUser() {
    setLoadingFollow(true); // Inicia el estado de carga
    try {
      if (followed) {
        // Dejar de seguir
        await updateLoggedInUserFollowing(loggedInDocId, profileUserId, true); // 'true' indica acción inversa
        await updateFollowedUserFollowers(spDocId, userId, true);
      } else {
        // Seguir
        await updateLoggedInUserFollowing(loggedInDocId, profileUserId, false);
        await updateFollowedUserFollowers(spDocId, userId, false);
      }
      setFollowed(!followed); // Cambia el estado
    } catch (error) {
      console.error("Error al seguir/dejar de seguir al usuario:", error);
    } finally {
      setLoadingFollow(false); // Termina el estado de carga
    }
  }

  if (!username || !fullName) {
    return (
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="rounded-full w-10 h-10 mr-3" />
        <div className="flex-1">
          <Skeleton width={150} height={20} />
          <Skeleton width={100} height={15} />
        </div>
      </div>
    );
  }

  return (
    <li className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <img
          className="rounded-full w-10 h-10 flex mr-3"
          src={`/images/images_ig/avatars/${username}.jpg`}
          alt={`${username} avatar`}
          onError={(e) => (e.target.src = "/images/images_ig/avatars/default.png")}
        />
        <div>
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm text-gray-500">{fullName}</p>
        </div>
      </div>
      <button
        type="button"
        className={`text-xs font-bold px-4 py-1 rounded ${followed
          ? "text-red-500 "
          : "text-blue-medium bg-transparent"
          }`}
        onClick={handleFollowUser}
        disabled={loadingFollow}
      >
        {loadingFollow ? "Cargando..." : followed ? "Dejar de seguir" : "Seguir"}
      </button>
    </li>
  );
};

SuggestedProfile.propTypes = {
  spDocId: PropTypes.string.isRequired,
  username: PropTypes.string,
  fullName: PropTypes.string,
  userId: PropTypes.string.isRequired,
  loggedInDocId: PropTypes.string.isRequired,
  profileUserId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
