import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "../../hooks/useFirebase";
import { useUser } from "../../hooks/useUser";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; // Asegúrate de usar la API modular

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
    const userId = useUser()?.userData?.userId || "";
    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firestore } = useFirebase(); // El firestore ya está configurado desde el contexto

    const handleToggleLiked = async () => {
        setToggleLiked((prev) => !prev);

        // Asegúrate de que firestore esté correctamente inicializado
        if (firestore) {
            const photoRef = doc(firestore, "photos", docId); // Usamos doc para obtener una referencia al documento
            await updateDoc(photoRef, {
                likes: toggleLiked
                    ? arrayRemove(userId) // Si el usuario quita el like
                    : arrayUnion(userId), // Si el usuario da like
            });
            setLikes((prev) => (toggleLiked ? prev - 1 : prev + 1));
        } else {
            console.error("Firestore no está inicializado correctamente");
        }
    };

    return (
        <div className="actions">
            <svg
                onClick={handleToggleLiked}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-8 cursor-pointer ${toggleLiked ? "fill-red text-red-primary" : "text-black-light"}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
            <p className="font-bold">
                {likes} {likes === 1 ? "Me gusta" : "Me gustas"}
            </p>
        </div>
    );
};

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired,
};

export default Actions;
