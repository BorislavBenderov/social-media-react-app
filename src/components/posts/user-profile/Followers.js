import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { database } from "../../../firebaseConfig";

export const Followers = ({ userProfile }) => {
    const { loggedUser } = useContext(AuthContext);

    const followHandler = async () => {
        if (userProfile.followers.includes(loggedUser.uid)) {
            try {
                await updateDoc(doc(database, 'users', userProfile.id), {
                    followers: arrayRemove(loggedUser.uid)
                });
                await updateDoc(doc(database, 'users', loggedUser.uid), {
                    following: arrayRemove(userProfile.id)
                });
            } catch (error) {
                alert(error.message);
            }
        } else {
            try {
                await updateDoc(doc(database, 'users', userProfile.id), {
                    followers: arrayUnion(loggedUser.uid)
                });
                await updateDoc(doc(database, 'users', loggedUser.uid), {
                    following: arrayUnion(userProfile.id)
                });
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <button onClick={followHandler}>{userProfile?.followers?.includes(loggedUser.uid) ? 'Following' : 'Follow'}</button>
    );
}