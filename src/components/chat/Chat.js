import { onSnapshot, doc } from "firebase/firestore";
import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { database } from "../../firebaseConfig";
import { CreateMessage } from "./CreateMessage";
import { Messages } from "./Messages";

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [likes, setLikes] = useState([]);
    const { users } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const { chatId } = useParams();
    const scroll = useRef();

    const userProfile = users.filter(user => chatId.includes(user.uid)).find(user => user.uid !== loggedUser?.uid);

    useEffect(() => {
        onSnapshot(doc(database, 'chats', chatId), (snapshot) => {
            if (snapshot.data().messages.length > 0) {
                setMessages(snapshot.data().messages.map((item) => {
                    return { ...item };
                }));
                setLikes(snapshot.data().likes);
            }
        });
    }, [chatId]);

    return (
        <div className="messanger">
            <section className="messanger__messages">
                <div className="otheruser__mess__img">
                    <img className="message__img" src={userProfile?.image} alt="" />
                    <h2>{userProfile?.displayName}</h2>
                </div>
                <div className="messages__container">
                    {messages.map(message => <Messages key={message.id} message={message} likes={likes} scroll={scroll} />)}
                </div>
                <div className="message__input">
                    <CreateMessage chatId={chatId} scroll={scroll} />
                </div>
            </section>
        </div>
    );
}