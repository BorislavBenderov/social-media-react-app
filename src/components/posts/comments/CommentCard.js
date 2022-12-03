import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";
import { database } from "../../../firebaseConfig";
import { CommentLikes } from "./CommentLikes";

export const CommentCard = ({ comment }) => {
    const { loggedUser } = useContext(AuthContext);
    const { users } = useContext(UserContext);

    const commentOwner = loggedUser.uid === comment.uid;
    const userCommentInfo = users.find(user => user.uid === comment.uid)

    const deleteComment = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this comment?');

        if (confirmation) {
            try {
                await deleteDoc(doc(database, 'comments', comment.id));
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="postdet">
            <img
                src={userCommentInfo.image}
                alt=""
            />
            <Link to={`/profile/${userCommentInfo.id}`}>
                <p className="comment__name">{userCommentInfo.displayName}</p>
            </Link>
            <p className="comment">{comment.text}</p>
            <CommentLikes comment={comment} />
            {commentOwner
                ? <button className="delete__comment" onClick={deleteComment}>
                    <i className="fa fa-times" aria-hidden="true" style={{ color: "black" }}></i>
                </button>
                : ''}
        </div>
    );
}