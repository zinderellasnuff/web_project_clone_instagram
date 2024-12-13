import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import { DEFAUT_IMAGE_PATH} from "../../constans/paths.js";

const Header = ({
                    photosCount,
                    profile: {
                        docId: profileDocId,
                        userId: profileUserId,
                        fullName,
                        followers = [],
                        following = [],
                        username: profileUsername,
                    },
                    followerCount,
                    setFollowerCount,
                }) => {
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const [userData, setUserData] = useState(null);

    const activeBtnFollow =
        userData?.username && userData?.username !== profileUsername;

    const handleToggleFollow = async () => {
        try {
            setIsFollowingProfile((prev) => !prev);
            setFollowerCount(isFollowingProfile ? followerCount - 1 : followerCount + 1);
            await toggleFollow(
                isFollowingProfile,
                userData.docId,
                profileDocId,
                profileUserId,
                userData.userId
            );
        } catch (error) {
            console.error("Error al seguir/dejar de seguir:", error);
        }
    };

    useEffect(() => {
        const checkIfUserFollows = async () => {
            try {
                const isFollowing = await isUserFollowingProfile(
                    userData?.username,
                    profileUserId
                );
                setIsFollowingProfile(isFollowing);
            } catch (error) {
                console.error("Error al comprobar si sigue el perfil:", error);
            }
        };

        if (userData?.username && profileUserId) {
            checkIfUserFollows();
        }
    }, [userData?.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                {profileUsername ? (
                    <img
                        className="rounded-full h-40 w-40 flex"
                        alt={`${fullName} profile pic`}
                        src={`/images/images_ig/avatars/${profileUsername}.jpg`}
                        onError={(e) => (e.target.src = DEFAUT_IMAGE_PATH)}
                    />
                ) : (
                    <Skeleton circle height={150} width={150} count={1} />
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profileUsername}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    <p className="mr-10">
                        <span className="font-bold">{photosCount}</span> photos
                    </p>
                    <p className="mr-10">
                        <span className="font-bold">{followerCount}</span>{" "}
                        {followerCount === 1 ? "follower" : "followers"}
                    </p>
                    <p className="mr-10">
                        <span className="font-bold">{following.length}</span> following
                    </p>
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {fullName || <Skeleton count={1} height={24} />}
                    </p>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        username: PropTypes.string,
        followers: PropTypes.array,
        following: PropTypes.array,
    }).isRequired,
};

export default Header;