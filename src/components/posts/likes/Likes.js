import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { updateDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
import { database } from "../../../firebaseConfig";


export const Likes = ({ post }) => {
    const { loggedUser } = useContext(AuthContext);

    const likeHandler = async () => {
        if (post.likes?.includes(loggedUser.uid)) {
            try {
                await updateDoc(doc(database, 'posts', post.id), {
                    likes: arrayRemove(loggedUser.uid)
                });
            } catch (error) {
                alert(error.message);
            }
        } else {
            try {
                await updateDoc(doc(database, 'posts', post.id), {
                    likes: arrayUnion(loggedUser.uid)
                });
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <i className={`fa fa-heart${!post.likes?.includes(loggedUser?.uid) ? '-o' : ''} fa-lg`}
            style={{ cursor: 'pointer', color: post.likes?.includes(loggedUser?.uid) ? 'red' : null }}
            onClick={likeHandler}
        ></i>
    );
}