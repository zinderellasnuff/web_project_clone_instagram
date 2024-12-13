import { useEffect, useReducer } from "react";
import Header from "./Header";
import Photos from "./Photos";
import PropTypes from "prop-types";
import { getUserPhotosByUserId } from "../../services/firebase";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({
    ...state,
    ...newState,
  });

  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
      reducer,
      initialState
  );

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      try {
        const photos = await getUserPhotosByUserId(user.userId);
        dispatch({
          profile: user,
          photosCollection: photos,
          followerCount: user?.followers?.length || 0,
        });
      } catch (error) {
        console.error("Error al cargar la información del perfil:", error);
      }
    };

    if (user) {
      getProfileInfoAndPhotos();
    }
  }, [user]);

  return (
      <>
        <Header
            photosCount={photosCollection ? photosCollection.length : 0}
            profile={profile}
            followerCount={followerCount}
            setFollowerCount={(count) => dispatch({ followerCount: count })}
        />
        <Photos photos={photosCollection} />
      </>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
  }).isRequired,
};