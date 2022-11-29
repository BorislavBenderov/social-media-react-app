import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Messages = ({ message }) => {
    const { loggedUser } = useContext(AuthContext);

    const currentUserMessages = loggedUser.uid === message.uid;

    return (
        <div className="message" style={{ flexDirection: currentUserMessages ? 'row-reverse' : '' }}>
            <img src={message.image} alt="" />
            <p style={{ backgroundColor: currentUserMessages ? 'blueviolet' : 'gray' }}>{message.message}</p>
        </div>
    );
}