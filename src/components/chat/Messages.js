import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useParams } from "react-router-dom";

export const Messages = ({ message, likes }) => {
    const { loggedUser } = useContext(AuthContext);
    const { chatId } = useParams();

    const currentUserMessages = loggedUser.uid === message.uid;

    const likeHandler = async () => {
        if (likes.includes(message.id)) {
            try {
                await updateDoc(doc(database, `chats/${chatId}`), {
                    likes: arrayRemove(message.id)
                });
            } catch (error) {
                alert(error.message);
            }
        } else {
            try {
                await updateDoc(doc(database, `chats/${chatId}`), {
                    likes: arrayUnion(message.id)
                });
            } catch (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div className="message" style={{ flexDirection: currentUserMessages ? 'row-reverse' : '' }}>
            <img src={message.image} className='message__img' alt="" />
            {message.message
                ? <p style={{ backgroundColor: currentUserMessages ? 'blueviolet' : 'gray' }}>{message.message}</p>
                : ''}
            {message.photo
                ? <img src={message.photo} className='message__photo' alt="" />
                : ""}
            <i className={`fa fa-heart${!likes?.includes(message.id) ? '-o' : ''} fa-lg`}
                style={{ cursor: 'pointer', color: likes?.includes(message.id) ? 'red' : null, marginLeft: '5px', marginRight: '5px' }}
                onClick={!currentUserMessages ? likeHandler : null}
            ></i>
        </div>
    );
}