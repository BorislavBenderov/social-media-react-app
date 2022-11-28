import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { updateDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
import { database } from "../../../firebaseConfig";


export const Likes = ({ post }) => {
    const { loggedUser } = useContext(AuthContext);

    const likeHandler = () => {
        if (post.likes?.includes(loggedUser.uid)) {
            updateDoc(doc(database, 'posts', post.id), {
                likes: arrayRemove(loggedUser.uid)
            })
                .then(() => {
                    console.log('unliked');
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            updateDoc(doc(database, 'posts', post.id), {
                likes: arrayUnion(loggedUser.uid)
            })
                .then(() => {
                    console.log('liked');
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }

    return (
        <i className={`fa fa-heart${!post.likes?.includes(loggedUser.uid) ? '-o' : ''} fa-lg`}
            style={{ cursor: 'pointer', color: post.likes?.includes(loggedUser.uid) ? 'red' : null }}
            onClick={likeHandler}
        ></i>
    );
}