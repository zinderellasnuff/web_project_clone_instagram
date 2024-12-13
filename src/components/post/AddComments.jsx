import { useState } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "../../hooks/useFirebase";
import { useUser } from "../../hooks/useUser";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore"; // Asegúrate de importar estas funciones

const AddComments = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const { firestore } = useFirebase(); // firestore ya está proporcionado en el contexto
  const displayName = useUser()?.userData?.username;

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (comment.trim() === "") return;

    const newComment = { displayName, comment };
    setComments([newComment, ...comments]);
    setComment("");

    try {
      // Accedemos al documento específico con doc(firestore, "photos", docId)
      const photoRef = doc(firestore, "photos", docId);

      // Actualizamos el documento con la nueva colección de comentarios
      await updateDoc(photoRef, {
        comments: arrayUnion(newComment), // Usamos arrayUnion para agregar un comentario
      });
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
      <div className="border-t border-gray-primary">
        <form
            className="flex justify-between pl-0 pr-5"
            method="POST"
            onSubmit={handleSubmitComment}
        >
          <input
              aria-label="Agregar comentario"
              autoComplete="off"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4"
              type="text"
              placeholder="Agrega tu comentario..."
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              ref={commentInput}
          />
          <button
              className={`text-sm font-bold text-blue-medium ${!comment && "opacity-25"}`}
              type="submit"
              disabled={comment.length < 1}
          >
            Enviar
          </button>
        </form>
      </div>
  );
};

AddComments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};

export default AddComments;
