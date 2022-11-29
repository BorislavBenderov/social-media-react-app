import { onSnapshot, doc, } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { database } from "../../firebaseConfig";

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const { users, chatId } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const { userId } = useParams();
    const userProfile = users.find(user => user.uid === userId);

    useEffect(() => {
        onSnapshot(doc(database, 'chats', chatId), (snapshot) => {
            setMessages(snapshot.data().messages.map((item) => {
                return { ...item };
            }));
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

                </div>
                <div className="message__input">
                    <form>
                        <label htmlFor="message"></label>
                        <textarea name="message" id="message"></textarea>
                    </form>
                </div>
            </section>
        </div>
    );
}