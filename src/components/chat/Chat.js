import { onSnapshot, doc, } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
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
    const userProfile = users.filter(user => chatId.includes(user.uid)).find(user => user.uid !== loggedUser?.uid);

    useEffect(() => {
        onSnapshot(doc(database, 'chats', chatId), (snapshot) => {
            setMessages(snapshot.data().messages.map((item) => {
                return { ...item };
            }));
            setLikes(snapshot.data().likes);
        });
    }, [chatId]);

    return (
        <div className="messanger">
            <section className="messanger__users">
                <div className="messanger__curentuser">
                    <h2>{loggedUser.displayName}</h2>
                </div>
                <div className="messanger__otherusers">
                    <img src={userProfile?.image} alt="" />
                    <h2>{userProfile?.displayName}</h2>
                </div>
            </section>
            <section className="messanger__messages">
                <h2>{userProfile?.displayName}</h2>
                <div className="messages__container">
                    {messages.map(message => <Messages key={message.id} message={message} likes={likes}/>)}
                </div>
                <div className="message__input">
                    <CreateMessage chatId={chatId} />
                </div>
            </section>
        </div>
    );
}