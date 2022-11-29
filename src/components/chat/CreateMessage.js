import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { database } from "../../firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../contexts/AuthContext";

export const CreateMessage = ({ chatId }) => {
    const [input, setInput] = useState('');
    const { loggedUser } = useContext(AuthContext);

    const onCreateMessage = (e) => {
        e.preventDefault();

        if (input === '') {
            alert('Please add a valid message!');
            return;
        }
        updateDoc(doc(database, 'chats', chatId), {
            messages: arrayUnion({
                message: input,
                id: uuidv4(),
                image: loggedUser.photoURL
            })
        })
            .then(() => {
                setInput('');
            })
    }

    return (
        <form onClick={onCreateMessage}>
            <label htmlFor="message"></label>
            <textarea
                name="message"
                id="message"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}>
            </textarea>
            <button>click</button>
        </form>
    );
}