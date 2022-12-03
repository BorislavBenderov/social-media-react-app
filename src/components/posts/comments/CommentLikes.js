import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { database } from "../../../firebaseConfig";

export const CommentLikes = ({ comment }) => {
    const { loggedUser } = useContext(AuthContext);

    const likeHandler = async () => {
        if (comment.likes?.includes(loggedUser.uid)) {
            try {
                await updateDoc(doc(database, 'comments', comment.id), {
                    likes: arrayRemove(loggedUser.uid)
                });
            } catch (error) {
                alert(error.message);
            }

        } else {
            try {
                await updateDoc(doc(database, 'comments', comment.id), {
                    likes: arrayUnion(loggedUser.uid)
                });
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="like-container">
            <i className={`fa fa-heart${!comment?.likes?.includes(loggedUser?.uid) ? '-o' : ''} fa-lg`}
                style={{ cursor: 'pointer', color: comment?.likes?.includes(loggedUser?.uid) ? 'red' : null }}
                onClick={likeHandler}>{comment?.likes.length > 0 ? comment?.likes.length : ''}</i>
        </div>
    );
}