import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

function Post({ content }) {
    const {
        dateCreated,
        comments = [],
        userLikedPhoto,
        likes = [],
        docId,
        username,
        imageSrc,
        caption,
    } = content;

    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    const currentUserId = ""; // Reemplazar con lógica para obtener el ID actual del usuario

    return (
        <div className="bg-white rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
            <Header username={username} />

            {/* Contenedor de la imagen */}
            <div className="relative">
                <Image src={imageSrc} caption={caption} />
            </div>

            {/* Acciones (Me gusta, compartir, etc.) */}
            <div className="px-4 py-2">
                <Actions
                    docId={docId}
                    totalLikes={likes.length}
                    likedPhoto={Array.isArray(likes) && likes.includes(currentUserId)}
                    handleFocus={handleFocus}
                />
            </div>

            {/* Pie de foto */}
            <div className="px-4 py-2">
                <Footer caption={caption} username={username} />
            </div>

            {/* Sección de comentarios */}
            <div className="px-4 pb-4">
                <Comments
                    docId={docId}
                    comments={comments}
                    posted={dateCreated}
                    commentInput={commentInput}
                />
            </div>
        </div>
    );
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired, // Minúscula es correcto
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,
    }).isRequired,
};

export default Post;
