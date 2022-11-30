import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

export const OtherUsers = ({ user }) => {
    const { loggedUser } = useContext(AuthContext);

    const combinedId = loggedUser?.uid > user?.uid
        ? loggedUser?.uid + user?.uid
        : user?.uid + loggedUser?.uid;

    const handleSelect = async () => {
        try {
            const res = await getDoc(doc(database, 'chats', combinedId));

            if (!res.exists()) {
                await setDoc(doc(database, 'chats', combinedId), {
                    messages: []
                })
            }

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="messanger__otherusers" key={user.id}>
            <Link to={`/messages/${combinedId}`} onClick={handleSelect}>
                <img src={user.image} alt="" />
            </Link>
            <Link to={`/messages/${combinedId}`} onClick={handleSelect}>
                <h2>{user.displayName}</h2>
            </Link>
        </div >
    );
}