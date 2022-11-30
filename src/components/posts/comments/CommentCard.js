import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { database } from "../../../firebaseConfig";

export const CommentCard = ({ comment, postId }) => {
    const { loggedUser } = useContext(AuthContext);

    const commentOwner = loggedUser.uid === comment.ownerId;

    const deleteComment = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this comment?');

        if (confirmation) {
            await updateDoc(doc(database, 'posts', postId), {
                comments: arrayRemove(comment)
            });
        }
    }

    return (
        <div className="name__img">
            <img
                src={comment.ownerImage}
                alt=""
            />
            <p className="comment__name">{comment.ownerName}</p>
            <p className="comment">{comment.comment}</p>
            {commentOwner
                ? <button className="delete__comment" onClick={deleteComment}>
                    <i className="fa fa-times" aria-hidden="true" style={{ color: "black" }}></i>
                </button>
                : ''}
        </div>
    );
}