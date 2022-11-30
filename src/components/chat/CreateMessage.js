import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { database, storage } from "../../firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../contexts/AuthContext";

export const CreateMessage = ({ chatId }) => {
    const [input, setInput] = useState('');
    const { loggedUser } = useContext(AuthContext);

    const onCreateMessage = (e) => {
        e.preventDefault();

        updateDoc(doc(database, 'chats', chatId), {
            messages: arrayUnion({
                message: input,
                id: uuidv4(),
                image: loggedUser.photoURL,
                uid: loggedUser.uid,
            })
        })
            .then(() => {
                setInput('');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const onUploadFile = (e) => {
        e.preventDefault();

        const image = e.target.files[0];

        const storageRef = ref(storage, `photos/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (err) => {
                alert(err.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadUrl) => {
                        updateDoc(doc(database, 'chats', chatId), {
                            messages: arrayUnion({
                                message: input,
                                id: uuidv4(),
                                image: loggedUser.photoURL,
                                uid: loggedUser.uid,
                                photo: downloadUrl
                            })
                        })
                            .then(() => {
                                setInput('');
                            })
                            .catch((err) => {
                                alert(err.message);
                            })
                    })
            })
    }

    return (
        <form onKeyDown={(e) => e.key === "Enter" ? onCreateMessage(e) : null}>
            <label htmlFor="message"></label>
            <textarea
                name="message"
                id="message"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <label htmlFor="image">
                <i className="fa fa-picture-o fa-lg" aria-hidden="true"></i>
            </label>
            <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => onUploadFile(e)} />
        </form>
    );
}