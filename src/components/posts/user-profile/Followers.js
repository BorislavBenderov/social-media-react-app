import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { database } from "../../../firebaseConfig";

export const Followers = ({ userProfile }) => {
    const { loggedUser } = useContext(AuthContext);

    const followHandler = async () => {
        if (userProfile.followers.includes(loggedUser.uid)) {
            await updateDoc(doc(database, 'users', userProfile.id), {
                followers: arrayRemove(loggedUser.uid)
            });
        } else {
            await updateDoc(doc(database, 'users', userProfile.id), {
                followers: arrayUnion(loggedUser.uid)
            });
        }
    }

    return (
        <button onClick={followHandler}>follow</button>
    );
}