import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "../../hooks/useFirebase";
import { useUser } from "../../hooks/useUser";
import { doc, getDoc } from "firebase/firestore"; // Asegúrate de usar la API modular

const CommentsModal = ({ docId, closeModal }) => {
    const { firestore } = useFirebase();
    const { userData } = useUser();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);

    // Obtener los comentarios cuando se carga el modal
    useEffect(() => {
        const fetchComments = async () => {
            if (firestore && docId) {
                const photoRef = doc(firestore, "photos", docId);
                const docSnap = await getDoc(photoRef);
                if (docSnap.exists()) {
                    setComments(docSnap.data().comments || []);
                    setLoading(false);
                }
            }
        };
        fetchComments();
    }, [firestore, docId]);

    // Manejar el envío de un nuevo comentario
    const handleAddComment = async () => {
        if (!newComment.trim()) return; // Evitar comentarios vacíos

        // Lógica para agregar un nuevo comentario
        if (firestore && docId) {
            const photoRef = doc(firestore, "photos", docId);
            await updateDoc(photoRef, {
                comments: arrayUnion({
                    text: newComment,
                    userId: userData?.userId,
                    username: userData?.username,
                    createdAt: new Date(),
                }),
            });
            setNewComment(""); // Limpiar el input
            setComments((prevComments) => [
                ...prevComments,
                { text: newComment, userId: userData?.userId, username: userData?.username },
            ]);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 text-2xl font-bold"
                >
                    &times;
                </button>
                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold">Comentarios</h2>
                </div>

                {loading ? (
                    <div className="text-center">Cargando comentarios...</div>
                ) : (
                    <div className="max-h-60 overflow-y-auto">
                        {comments.map((comment, index) => (
                            <div key={index} className="flex mb-4">
                                <div className="font-bold">{comment.username}</div>
                                <p className="ml-2">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex items-center">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="border rounded-full py-2 px-4 w-full mr-2"
                    />
                    <button
                        onClick={handleAddComment}
                        className="bg-blue-500 text-white rounded-full px-4 py-2"
                    >
                        Comentar
                    </button>
                </div>
            </div>
        </div>
    );
};

CommentsModal.propTypes = {
    docId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default CommentsModal;
