import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComments from "./AddComments";
import { useState, useEffect } from "react";

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
    const [comments, setComments] = useState(allComments || []); // Aseguramos un array inicial

    useEffect(() => {
        // Sincronizamos `comments` con `allComments` si cambian
        setComments(allComments || []);
    }, [allComments]);

    return (
        <>
            <div>
                <div className="p-4 pt-1 pb-4">
                    {comments.length >= 3 && (
                        <p className="text-sm text-gray-base mb-1 cursor-pointer">
                            Ver todo {comments.length}
                        </p>
                    )}
                    {comments.slice(0, 3).map((item) => (
                        <p key={`${item.comment} - ${item.displayName}`} className="mb-1">
                            <Link to={`/p/${item.displayName}`}>
                                <span className="mr-1 font-bold">{item.displayName}</span>
                                <span>{item.comment}</span>
                            </Link>
                        </p>
                    ))}
                    <p className="text-gray-base uppercase text-xs mt-2">
                        {formatDistance(posted, new Date())} AGO
                    </p>
                </div>
            </div>
            <AddComments
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    );
};

export default Comments;

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
};
