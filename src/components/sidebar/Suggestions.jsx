import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../services/firebase.js";
import SuggestedProfile from "./SuggestedProfile.jsx";
import Skeleton from "react-loading-skeleton";

const Suggestions = ({ userId, following, loggedInDocId }) => {
  const [profiles, setProfiles] = useState(null); // Perfiles sugeridos
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    async function suggestedProfiles() {
      setLoading(true);
      try {
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response);
      } catch (error) {
        console.error("Error al obtener perfiles sugeridos:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return (
      <div className="mt-4">
        <h2 className="text-sm font-bold text-gray-500 mb-2">Sugerencias para ti</h2>
        <ul>
          {loading ? (
              // Mostramos Skeleton mientras se cargan los perfiles
              Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="mb-4 flex items-center">
                    <Skeleton className="rounded-full w-10 h-10 mr-3" />
                    <div>
                      <Skeleton width={150} height={20} />
                      <Skeleton width={100} height={15} />
                    </div>
                  </div>
              ))
          ) : profiles && profiles.length > 0 ? (
              // Mostramos la lista de perfiles sugeridos
              profiles.map((profile) => (
                  <SuggestedProfile
                      spDocId={profile.docId}
                      key={profile.userId}
                      username={profile.username}
                      fullName={profile.fullName}
                      profileUserId={profile.userId}
                      userId={userId}
                      loggedInDocId={loggedInDocId}
                  />
              ))
          ) : (
              // Mensaje cuando no hay perfiles sugeridos
              <p className="text-gray-500 text-sm">No hay sugerencias disponibles.</p>
          )}
        </ul>
      </div>
  );
};

Suggestions.propTypes = {
  userId: PropTypes.string.isRequired,
  following: PropTypes.array.isRequired,
  loggedInDocId: PropTypes.string.isRequired,
};

export default Suggestions;