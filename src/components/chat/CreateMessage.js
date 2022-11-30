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

        const formData = new FormData(e.target);
        const image = formData.get('image');

        if (input === '' && image.name === '') {
            alert('Please add a valid message!');
            return;
        }

        if (image.name !== '') {
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

        } else {
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


    }

    return (
        <form onSubmit={onCreateMessage}>
            <label htmlFor="message"></label>
            <input
                name="message"
                id="message"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}>
            </input>
            <label htmlFor="image"></label>
            <input
                type="file"
                name="image"
                id="image" />
            <button>click</button>
        </form>
    );
}